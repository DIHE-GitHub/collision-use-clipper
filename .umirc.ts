import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'collision',
  },
  routes: [
    {
      path: '/',
      redirect: '/collision',
    },
    {
      name: 'collision',
      path: '/collision',
      component: './Collision',
    },
  ],
  npmClient: 'yarn',
  verifyCommit: {
    scope: ['feat', 'fix'],
    allowEmoji: true,
  },
});
