import dynamic from 'next/dynamic';

const DynamicArchiveClientComponent = dynamic(
  () => import('@/archives/_components'),
  { ssr: false, loading: () => <div>Loading...</div> }
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
