import dynamic from 'next/dynamic';

const DynamicControlClientComponent = dynamic(
  () => import('@/control/_components/channelControl'),
  { ssr: false }
);

export default async function Article() {
  return <DynamicControlClientComponent />;
}
