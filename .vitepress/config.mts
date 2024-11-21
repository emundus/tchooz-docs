import {defineConfigWithTheme} from 'vitepress'
import type {ThemeConfig} from 'vitepress-carbon'
import baseConfig from 'vitepress-carbon/config'
import {withMermaid} from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid(
    defineConfigWithTheme<ThemeConfig>({
        extends: baseConfig,
        title: "Tchooz - Documentation",
        description: "A website to learn how to develop on Tchooz project",
        srcDir: 'src',
        base: '/tchooz-docs/',
        lang: 'en-GB',
        head: [
            ['link',
                {rel: 'icon', href: './favicon.ico'}
            ]
        ],

        themeConfig: {
            // https://vitepress.dev/reference/default-theme-config
            logo: '/logo_tchooz.svg',
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
                                {text: 'Joomla!', link: 'https://manual.joomla.org/', target: '_blank'},
                                {text: 'Storybook', link: 'https://emundus.github.io/storybook', target: '_blank'},
                                {text: 'eMundus', link: 'https://emundus.fr', target: '_blank'}
                            ]
                        },
                        {
                            text: 'Dependencies',
                            items: [
                                {text: 'Fabrikar', link: 'https://fabrikar.com/', target: '_blank'},
                                {text: 'Gantry', link: 'https://gantry.org/', target: '_blank'},
                                {text: 'Hikashop', link: 'https://www.hikashop.com/', target: '_blank'},
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
                        items: [
                            {
                                text: 'Joomla!',
                                items: [
                                    {
                                        text: 'Create a view',
                                        link: 'docs/essentials/create-view'
                                    },
                                    {
                                        text: 'Create a module',
                                        link: 'docs/essentials/create-module'
                                    },
                                    {
                                        text: 'Create a plugin',
                                        link: 'docs/essentials/create-plugin'
                                    },
                                    {
                                        text: 'Understanding database',
                                        link: 'docs/essentials/database'
                                    },
                                    {
                                        text: 'Event handling',
                                        link: 'docs/essentials/event-handling'
                                    }
                                ]
                            },
                            {
                                text: 'eMundus',
                                items: [
                                    {
                                        text: 'Adding methods',
                                        link: 'docs/essentials/emundus/add-methods'
                                    },
                                    {
                                        text: 'Frequently asked questions',
                                        link: 'docs/essentials/emundus/faq'
                                    }
                                ]
                            },
                            {
                                text: 'Frontend',
                                items: [
                                    {
                                        text: 'Tailwind',
                                        link: 'docs/front/tailwind'
                                    },
                                    {
                                        text: 'Create a Vue component',
                                        link: 'docs/front/create-component'
                                    },
                                    {
                                        text: 'Wysiwyg',
                                        link: 'docs/front/wysiwyg'
                                    }
                                ]
                            },
                        ],
                    },
                    {
                        text: 'Fabrik',
                        items: [
                            {
                                text: 'Understanding Fabrik',
                                link: 'docs/fabrik/understanding-fabrik'
                            },
                            {
                                text: 'Create a plugin',
                                link: 'docs/fabrik/create-plugin'
                            },
                            {
                                text: 'Javascript',
                                link: 'docs/fabrik/javascript'
                            }
                        ]
                    },
                    {
                        text: 'Features',
                        items: [
                            {
                                text: 'Booking',
                                link: 'docs/features/booking'
                            },
                            {
                                text: 'Workflow Builder',
                                link: 'docs/features/workflow-builder'
                            }
                        ]
                    },
                    {
                        text: 'Best Practices',
                        items: []
                    },
                    {
                        text: 'Extra',
                        items: [
                            {
                                text: 'Standalone installation',
                                link: 'docs/extra/standalone-installation'
                            },
                            {
                                text: 'Some reminders',
                                link: 'docs/extra/some-reminders'
                            },
                        ]
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
                {icon: 'github', link: 'https://github.com/emundus/tchooz'}
            ],
        },
        mermaid: {
            //mermaidConfig !theme here works for ligth mode since dark theme is forced in dark mode
        },
    })
);
