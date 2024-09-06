import { integer, serial, pgTable, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  first_name: varchar('first_name').notNull(),
  email: varchar('email').unique().notNull(),
  role_id: integer('role_id'),
});

export const user_role = pgTable('user_role', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  user_role: one(user_role, {
    fields: [users.role_id],
    references: [user_role.id],
  }),
}));
