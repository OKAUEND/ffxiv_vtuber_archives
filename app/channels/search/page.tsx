import { SearchCategories } from '@/channels/_components/Search/SearchCategories';
import { getTags } from '@/_prisma';
import { convertTagsToCategoryTags } from '@/_utile/convert';

export default async function ChannelSearchIndex() {
  const tags = convertTagsToCategoryTags(getTags());
  return <SearchCategories tags={tags} />;
}
