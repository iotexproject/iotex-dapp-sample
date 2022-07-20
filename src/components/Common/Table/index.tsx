import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { observer } from 'mobx-react-lite';
import { Box, Center, Pagination, Table as MantineTable, TableProps } from '@mantine/core';
import { useEffect } from 'react';
//refer https://github.com/TanStack/table/blob/main/examples/react/basic/src/main.tsx

interface IProps extends TableProps {
  data: any[];
  columns: ColumnDef<any>[];
  showFooter?: boolean;
  showPagination?: boolean;
}

export const Table = observer(({ data, columns, showFooter, showPagination = true, ...TableProps }: IProps) => {
  const ReactTableProps = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
  };
  !showPagination ? delete ReactTableProps.getPaginationRowModel : null;
  const table = useReactTable(ReactTableProps);

  useEffect(() => {
    showPagination ? table.setPageSize(5) : null;
  }, []);

  return (
    <>
      <Box>
        <MantineTable {...TableProps} style={{ tableLayout: 'fixed' }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>

          {showFooter && (
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}</th>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </MantineTable>
      </Box>
      <Center mt={20}>
        <Pagination
          total={table.getPageCount()}
          siblings={1}
          onChange={(page) => {
            table.setPageIndex(page - 1);
          }}
        />
      </Center>
    </>
  );
});
