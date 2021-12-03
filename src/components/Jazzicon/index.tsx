import React, { createRef, PureComponent } from "react"
import PropTypes from "prop-types"
import jazzicon from "@metamask/jazzicon"
import iconFactoryGenerator from "./icon-factory"

const iconFactory = iconFactoryGenerator(jazzicon)

/**
 * Wrapper around the jazzicon library to return a React component, as the library returns an
 * HTMLDivElement which needs to be appended.
 */
export default class Jazzicon extends PureComponent {
  static propTypes = {
    address: PropTypes.string.isRequired,
    className: PropTypes.string,
    diameter: PropTypes.number,
    style: PropTypes.object,
    useTokenDetection: PropTypes.bool,
  }

  static defaultProps = {
    diameter: 46,
  }

  container: React.RefObject<any> = createRef()

  componentDidMount() {
    this.appendJazzicon()
  }

  componentDidUpdate(prevProps) {
    const { address: prevAddress, diameter: prevDiameter } = prevProps
    const { address, diameter } = this.props as any

    if (address !== prevAddress || diameter !== prevDiameter) {
      this.removeExistingChildren()
      this.appendJazzicon()
    }
  }

  removeExistingChildren() {
    const { children } = this.container.current
    for (let i = 0; i < children.length; i++) {
      this.container.current.removeChild(children[i])
    }
  }

  appendJazzicon() {
    const { address, diameter, useTokenDetection } = this.props as any
    const image = iconFactory.iconForAddress(address, diameter, useTokenDetection, [address])
    this.container.current.appendChild(image)
  }

  render() {
    const { className, style } = this.props as any
    return <div className={className} ref={this.container} style={{ ...style, display: "flex" }}></div>
  }
}
