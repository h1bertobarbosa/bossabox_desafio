import ToolTags from '@src/modules/tools/contracts/ToolTags';
export default interface CreateToolData {
  title: string;
  link: string;
  description: string;
  user_id: string;
  tags: ToolTags;
}
