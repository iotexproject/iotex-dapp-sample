import { Contract, Options } from "iotex-antenna/lib/contract/contract";
import { AntennaUtils } from "../utils/antenna";
import { ABIDefinition } from "iotex-antenna/lib/contract/abi";
import EventPromise from "event-promised";

export class IContract extends Contract {
  _abi: any;
  constructor(jsonInterface?: Array<ABIDefinition>, address?: string, options?: Options) {
    super(jsonInterface, address, options);
    this._abi = jsonInterface;
  }

  public async readContract({
    method,
    args,
    //@ts-ignore
    contractAddress = this.address,
    //@ts-ignore
    abi = this._abi,
    from,
  }: {
    from: string;
    method: string;
    args?: Array<any>;
    contractAddress?: string;
    abi?: string;
  }): Promise<any> {
    return AntennaUtils.getAntenna().iotx.readContractByMethod(
      {
        from,
        contractAddress,
        abi,
        method,
      },
      ...(args || [])
    );
  }

  public writeContract({ method, args, options }) {
    console.log({ method, args, options });
    return new EventPromise<any>(async (resolve, error, emit) => {
      const res = await this.methods[method](...args, {
        ...AntennaUtils.defaultContractOptions,
        ...options,
      });
      if (res.status) {
        emit(res.status, res);
      }
      resolve(res.actionHash || res.signature);
    });
  }
}
