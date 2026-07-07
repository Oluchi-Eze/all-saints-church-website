import { defineType } from 'sanity'

export default defineType({
  name: 'sermon',
  title: 'Sermons',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Sermon Title',
      type: 'string',
    },
    {
      name: 'preacher',
      title: 'Preacher',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date Preached',
      type: 'date',
    },
    {
      name: 'audioUrl',
      title: 'Audio/Video Link',
      type: 'url',
    },
    {
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
    },
  ],
})