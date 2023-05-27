import dynamic from 'next/dynamic';

const DynamicArchiveClientComponent = dynamic(
  () => import('@/app/archives/_components/Archives/route'),
  { ssr: false }
);

export default async function Article({
  params,
}: {
  params: { channelID: string };
}) {
  return (
    <div>
      <DynamicArchiveClientComponent channelID={params.channelID} />
    </div>
  );
}
