import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { SearchParams } from 'next/dist/server/request/search-params';
import { fetchInvoicesPages } from '@/app/lib/data';
 
export default async function Page({searchParams}:{searchParams?:Promise<{query?:string, page?:string}>}) {

  const searchParamsAwaited = await searchParams;
  const query = searchParamsAwaited?.query ?? '';
  const page = Number(searchParamsAwaited?.page) || 1;


  const totalPages = await fetchInvoicesPages(query);


  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + page} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={page} />
      </Suspense> 
      <div className="mt-5 flex w-full justify-center">
      <Pagination totalPages={totalPages} /> 
      </div>
    </div>
  );
}