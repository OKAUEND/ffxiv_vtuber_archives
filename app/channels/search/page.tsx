import { SearchOption } from '@/channels/_components/Search/SearchOption';
import { SearchCategories } from '@/channels/_components/Search/SearchCategories';

export default async function ChannelSearchIndex() {
  return (
    <>
      <SearchOption />
      <SearchCategories />
    </>
  );
}
