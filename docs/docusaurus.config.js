/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Express TypeScript Starter',
  tagline: "Build APIs You Won't Hate In Node Js",
  url: 'http://localhost:3001',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'kutia-software-company',
  projectName: 'express-typecript-starter',
  themeConfig: {
    navbar: {
      title: 'Express TypeScript Starter',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/docs',
          activeBasePath: 'docs',
          label: 'Getting started',
          position: 'left',
        },
      
        {
          href: 'https://github.com/kutia-software-company/express-typescript-starter',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'About',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Social Networks',
          items: [
            {
              label: 'Facebook',
              href: 'https://facebook.com/gentritabazi01',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/gentritabazi01',
            },
            {
              label: 'Linkedin',
              href: 'https://www.linkedin.com/in/gentritabazi01',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/gentritabazi01',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Express TypeScript Starter. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/kutia-software-company/express-typescript-starter/edit/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
