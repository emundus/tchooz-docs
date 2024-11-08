import {defineConfigWithTheme} from 'vitepress'
import type {ThemeConfig} from 'vitepress-carbon'
import baseConfig from 'vitepress-carbon/config'
import {withMermaid} from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid(
    defineConfigWithTheme<ThemeConfig>({
        extends: baseConfig,
        title: "Template - Documentation",
        description: "A website to learn how to develop on Template project",
        srcDir: 'src',
        base: '/vitepress-docs/',
        lang: 'en-GB',
        /* FAVICON
        head: [
            ['link',
                {rel: 'icon', href: './favicon.ico'}
            ]
        ],
        */

        themeConfig: {
            // https://vitepress.dev/reference/default-theme-config
            // logo: '/logo.svg',
            nav: [
                {
                    text: 'Docs',
                    items: [
                        {text: 'Getting started', link: '/docs/getting-started'},
                        {text: 'Essentials', link: '/docs/essentials'},
                        {text: 'Glossary', link: '/docs/glossary'},
                    ]
                },
                {
                    text: 'Ecosystem',
                    items: [
                        {
                            text: 'Resources',
                            items: [
                                {text: 'External link', link: 'https://example.fr/', target: '_blank'}
                            ]
                        },
                        {
                            text: 'Dependencies',
                            items: [
                                {text: 'Dependencies status', link: '/ecosystem/dependencies-status'},
                            ]
                        },
                    ]
                },
                {
                    text: 'About',
                    items: [
                        {text: 'Code of conduct', link: '/about/code-of-conduct'},
                        {text: 'Changelog', link: '/about/changelog'}
                    ]
                }
            ],

            search: {
                provider: 'local'
            },

            sidebar: {
                '/docs/': [
                    {
                        text: 'Getting started',
                        link: 'docs/getting-started'
                    },
                    {
                        text: 'Essentials',
                        items: []
                    },
                    {
                        text: 'Features',
                        items: []
                    },
                    {
                        text: 'Best Practices',
                        items: []
                    },
                    {
                        text: 'Extra',
                        items: []
                    },
                ],
                '/ecosystem/': [
                    {
                        text: 'Dependencies status',
                        link: 'ecosystem/dependencies-status'
                    }
                ],
                '/about/': [
                    {
                        text: 'Code of conduct',
                        link: 'about/code-of-conduct'
                    },
                    {
                        text: 'Changelog',
                        link: 'about/changelog'
                    }
                ]
            },

            socialLinks: [
                {icon: 'github', link: 'https://github.com/bhubinet/vitepress-docs'}
            ],
        },
        mermaid: {
            //mermaidConfig !theme here works for ligth mode since dark theme is forced in dark mode
        },
    })
);
