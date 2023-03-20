import { z } from 'zod';

export type Emoji = z.infer<typeof EmojiSchema>;
const EmojiSchema = z.object({
  name: z.string(),
  is_alias: z.number(),
  alias_for: z.string(),
  url: z.string(),
  team_id: z.string(),
  user_id: z.string(),
  created: z.number(),
  is_bad: z.boolean(),
  user_display_name: z.string(),
  avatar_hash: z.string(),
  can_delete: z.boolean(),
  synonyms: z.array(z.unknown()),
});

export const ExpectedShapeSchema = z.object({
  ok: z.boolean(),
  emoji: z.array(EmojiSchema),
  paging: z.object({
    count: z.number(),
    total: z.number(),
    page: z.number(),
    pages: z.number(),
  }),
});

export function readDroppedFile(
  file: File,
): Promise<Emoji[] | { message: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onabort = () => reject(reader.error ?? 'Unknown error');
    reader.onerror = () => reject(reader.error ?? 'Unknown error');
    reader.onload = () => {
      try {
        const object = JSON.parse(reader.result as string);
        const parsed = ExpectedShapeSchema.safeParse(object);
        if (parsed.success) {
          return resolve(parsed.data.emoji);
        } else {
          reject(parsed.error.message);
        }
      } catch (error) {
        reject('Malformed JSON-file');
      }
    };
    reader.readAsText(file);
  });
}
