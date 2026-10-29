import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable, type DataTableProps } from '@/ui/data-table';

interface Deployment {
  id: string;
  service: string;
  environment: string;
  status: 'Ready' | 'Building' | 'Failed';
  region: string;
}
const deployments: Deployment[] = Array.from({ length: 27 }, (_, index) => ({
  id: `dep-${String(index + 1).padStart(3, '0')}`,
  service: ['gateway', 'dashboard', 'worker', 'billing'][index % 4],
  environment: index % 3 === 0 ? 'Production' : 'Preview',
  status: index % 7 === 0 ? 'Failed' : index % 4 === 0 ? 'Building' : 'Ready',
  region: ['fra1', 'iad1', 'sfo1'][index % 3]
}));
const statusTone: Record<Deployment['status'], string> = {
  Ready: 'bg-success-muted text-success',
  Building: 'bg-warning-muted text-warning',
  Failed: 'bg-destructive/10 text-destructive'
};
const columns: ColumnDef<Deployment>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'service', header: 'Service' },
  { accessorKey: 'environment', header: 'Environment' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span className={`inline-flex px-2 py-0.5 text-xs font-medium ${statusTone[row.original.status]}`}>
        {row.original.status}
      </span>
    )
  },
  { accessorKey: 'region', header: 'Region' }
];
function DeploymentTable(props: DataTableProps<Deployment>) {
  return <DataTable {...props} />;
}
const meta = {
  title: 'UI/DataTable',
  component: DeploymentTable,
  tags: ['autodocs'],
  argTypes: {
    enableRowSelection: { control: 'boolean' }
  },
  args: {
    columns,
    data: deployments,
    getRowId: (row) => row.id,
    searchPlaceholder: 'Search deployments...',
    enableRowSelection: true
  }
} satisfies Meta<typeof DeploymentTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Empty: Story = {
  args: { data: [], emptyMessage: 'No deployments found.' }
};
