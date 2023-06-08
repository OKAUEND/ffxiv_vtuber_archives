import dynamic from 'next/dynamic';
import { LoadingBasicAnimation } from '@/_components/Loading';

const DynamicArchiveClientComponent = dynamic(
  () => import('@/archives/_components'),
  { ssr: false, loading: () => <LoadingBasicAnimation /> }
);

export default async function Article({
  params,
}: {
  params: { channelID: string };
}) {
  return (
    <>
      <DynamicArchiveClientComponent channelID={params.channelID} />
    </>
  );
}
