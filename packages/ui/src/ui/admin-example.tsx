'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { DataTable } from '@/ui/data-table';
import { PageActions, PageContainer, PageDescription, PageHeader, PageTitle } from '@/ui/page-layout';
import { Stat } from '@/ui/stat';

const services = [
  { name: 'docs', endpoint: 'docs.example.com', status: 'Connected', requests: 1248 },
  { name: 'preview', endpoint: 'preview.example.com', status: 'Connected', requests: 326 },
  { name: 'development', endpoint: 'dev.example.com', status: 'Offline', requests: 0 },
  { name: 'webhook', endpoint: 'hooks.example.com', status: 'Connected', requests: 87 }
];
const columns: ColumnDef<(typeof services)[number]>[] = [
  {
    accessorKey: 'name',
    header: 'Service',
    cell: ({ row }) => (
      <div>
        <span className="font-medium">{row.original.name}</span>
        <p className="mt-0.5 text-xs text-muted-foreground">{row.original.endpoint}</p>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge tone={row.original.status === 'Connected' ? 'success' : 'neutral'}>{row.original.status}</Badge>
    )
  },
  {
    accessorKey: 'requests',
    header: 'Requests',
    cell: ({ row }) => <span className="tabular-nums">{row.original.requests.toLocaleString('en')}</span>
  }
];

/** Fictional fixture data; no service or account requests are made. */
export function AdminExample() {
  return (
    <PageContainer>
      <PageHeader>
        <div>
          <PageTitle>Services</PageTitle>
          <PageDescription>
            A compact admin layout with shared metrics, status labels, and a searchable table.
          </PageDescription>
        </div>
        <PageActions>
          <Button variant="outline" render={<a href="/examples" />}>
            All examples
          </Button>
        </PageActions>
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Services" value={4} />
        <Stat label="Connected" value={3} />
        <Stat label="Requests" value="1,661" hint="Fictional example data" />
      </div>
      <Card padding="none">
        <CardHeader className="border-b border-border p-5">
          <CardTitle>Service directory</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <DataTable
            columns={columns}
            data={services}
            getRowId={(service) => service.name}
            enableRowSelection={false}
            initialPageSize={5}
            pageSizeOptions={[5, 10, 20]}
            searchPlaceholder="Find a service"
            emptyMessage="No services match your search."
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
