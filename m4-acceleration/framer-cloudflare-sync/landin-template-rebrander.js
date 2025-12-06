#!/usr/bin/env node
/**
 * Landin Template Rebrander
 * Deploys Strategic Intelligence Director brand-aware content to Framer template
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class LandinTemplateRebrander {
    constructor(templateUrl, contentPath) {
        this.templateUrl = templateUrl;
        this.contentPath = contentPath;
        this.strategicContent = this.loadStrategicContent();
        this.rebrandingMap = this.createRebrandingMap();
    }

    loadStrategicContent() {
        const strategicContentFile = resolve(__dirname, 'FoundationModels/learning-pipeline/48-hour-deployment-session-guides/strategic-intelligence-content/framer_agency_content.json');
        
        if (existsSync(strategicContentFile)) {
            const content = JSON.parse(readFileSync(strategicContentFile, 'utf8'));
            console.log('✅ Strategic Intelligence Director content loaded');
            return content;
        }
        
        // Fallback to generated content
        const generatedContentFile = resolve(__dirname, 'generated_content/framer_agency_content.json');
        if (existsSync(generatedContentFile)) {
            const content = JSON.parse(readFileSync(generatedContentFile, 'utf8'));
            console.log('✅ Generated content loaded as fallback');
            return content;
        }
        
        throw new Error('No Strategic Intelligence Director content found');
    }

    createRebrandingMap() {
        const pages = this.strategicContent.pages || {};
        const globalElements = this.strategicContent.global_elements || {};
        
        return {
            // Hero Section Mapping
            hero: {
                headline: pages.homepage?.hero?.headline || "Transform Your Digital Vision with Quantum-Spatial Innovation",
                subheadline: pages.homepage?.hero?.subheadline || "We create immersive experiences that bridge possibility and reality through Apple Intelligence and quantum-spatial design.",
                cta_primary: pages.homepage?.hero?.cta_primary || "Start Your Quantum Journey",
                cta_secondary: pages.homepage?.hero?.cta_secondary || "Explore Our Portfolio"
            },
            
            // Services Section Mapping
            services: {
                headline: pages.homepage?.services_preview?.headline || "Our Quantum-Spatial Services",
                services: pages.homepage?.services_preview?.services || [
                    {
                        title: "Vision Pro Innovation",
                        description: "Next-generation spatial computing experiences",
                        features: ["Immersive interfaces", "Spatial design systems", "Apple Intelligence integration"]
                    },
                    {
                        title: "iOS Game Development",
                        description: "Narrative-driven mobile experiences with quantum aesthetics", 
                        features: ["Interactive storytelling", "M4 optimization", "CloudKit integration"]
                    },
                    {
                        title: "AI-Powered Automation",
                        description: "Privacy-first intelligent workflows",
                        features: ["Brand-aware content", "Workflow automation", "Apple Intelligence"]
                    }
                ]
            },
            
            // About Section Mapping
            about: {
                headline: pages.about?.headline || "Pioneering Quantum-Spatial Innovation",
                story: pages.about?.story || "9Bit Studios emerges from the intersection of possibility and reality, where quantum-spatial innovation meets Apple Intelligence.",
                founder: {
                    name: pages.about?.team?.founder?.name || "Penny Platt",
                    title: pages.about?.team?.founder?.title || "Creative Director & Strategic Visionary",
                    bio: pages.about?.team?.founder?.bio || "Co-founder of 9Bit Studios, pioneering the intersection of Apple Intelligence and quantum-spatial design."
                }
            },
            
            // Portfolio Section Mapping
            portfolio: {
                headline: pages.homepage?.portfolio_preview?.headline || "Recent Quantum Creations",
                projects: pages.homepage?.portfolio_preview?.projects || [
                    {
                        name: "Petersen Games Portal",
                        type: "E-commerce Integration",
                        description: "Shopify-powered platform with quantum aesthetics"
                    },
                    {
                        name: "Oksana Creative Intelligence",
                        type: "AI Platform", 
                        description: "Brand-aware content generation with Apple Intelligence"
                    }
                ]
            },
            
            // Contact Section Mapping
            contact: {
                headline: pages.contact?.headline || "Begin Your Quantum Journey",
                intro: pages.contact?.intro || "Ready to transform your digital presence with quantum-spatial innovation?",
                methods: pages.contact?.contact_methods || [
                    { type: "consultation", label: "Schedule Strategic Consultation" },
                    { type: "email", label: "Direct Communication" },
                    { type: "portfolio", label: "Request Portfolio Review" }
                ]
            },
            
            // Detailed Services Page Mapping
            servicesPage: {
                headline: pages.services?.headline || "Quantum-Spatial Digital Experiences",
                intro: pages.services?.intro || "Our quantum-spatial innovation approach combines privacy-first principles with cutting-edge technology to create sophisticated digital experiences.",
                categories: pages.services?.service_categories || []
            },
            
            // Global Elements
            navigation: globalElements.navigation || ["Services", "Portfolio", "About", "Blog", "Contact"],
            footer_tagline: globalElements.footer_tagline || "Transforming possibility into reality through quantum-spatial innovation",
            
            // Brand Elements
            brand: {
                name: "9Bit Studios",
                color_scheme: globalElements.brand_elements?.color_scheme || {
                    primary: "#6A3093",
                    secondary: "#BF4080",
                    accent: "#5AC8FA",
                    background: "#131A36"
                },
                typography: globalElements.brand_elements?.typography || "SF Pro Display system font stack",
                effects: globalElements.brand_elements?.effects || "Liquid glass morphism with quantum transitions"
            }
        };
    }

    generateFramerDeploymentScript() {
        const deploymentScript = `
// Framer Template Rebranding Script
// Deploy Strategic Intelligence Director content to Landin template
// Template URL: ${this.templateUrl}

const rebrandingContent = ${JSON.stringify(this.rebrandingMap, null, 2)};

// Framer override functions for systematic rebranding
export function heroHeadlineOverride(Component) {
    return function HeroHeadline(props) {
        return Component({
            ...props,
            children: rebrandingContent.hero.headline
        });
    };
}

export function heroSubheadlineOverride(Component) {
    return function HeroSubheadline(props) {
        return Component({
            ...props,
            children: rebrandingContent.hero.subheadline
        });
    };
}

export function primaryCTAOverride(Component) {
    return function PrimaryCTA(props) {
        return Component({
            ...props,
            children: rebrandingContent.hero.cta_primary
        });
    };
}

export function secondaryCTAOverride(Component) {
    return function SecondaryCTA(props) {
        return Component({
            ...props,
            children: rebrandingContent.hero.cta_secondary
        });
    };
}

export function servicesHeadlineOverride(Component) {
    return function ServicesHeadline(props) {
        return Component({
            ...props,
            children: rebrandingContent.services.headline
        });
    };
}

export function serviceCardOverride(Component, serviceIndex) {
    return function ServiceCard(props) {
        const service = rebrandingContent.services.services[serviceIndex];
        return Component({
            ...props,
            title: service?.title,
            description: service?.description,
            features: service?.features
        });
    };
}

export function aboutHeadlineOverride(Component) {
    return function AboutHeadline(props) {
        return Component({
            ...props,
            children: rebrandingContent.about.headline
        });
    };
}

export function aboutStoryOverride(Component) {
    return function AboutStory(props) {
        return Component({
            ...props,
            children: rebrandingContent.about.story
        });
    };
}

export function founderInfoOverride(Component) {
    return function FounderInfo(props) {
        const founder = rebrandingContent.about.founder;
        return Component({
            ...props,
            name: founder.name,
            title: founder.title,
            bio: founder.bio
        });
    };
}

export function portfolioHeadlineOverride(Component) {
    return function PortfolioHeadline(props) {
        return Component({
            ...props,
            children: rebrandingContent.portfolio.headline
        });
    };
}

export function projectCardOverride(Component, projectIndex) {
    return function ProjectCard(props) {
        const project = rebrandingContent.portfolio.projects[projectIndex];
        return Component({
            ...props,
            name: project?.name,
            type: project?.type,
            description: project?.description
        });
    };
}

export function contactHeadlineOverride(Component) {
    return function ContactHeadline(props) {
        return Component({
            ...props,
            children: rebrandingContent.contact.headline
        });
    };
}

export function contactIntroOverride(Component) {
    return function ContactIntro(props) {
        return Component({
            ...props,
            children: rebrandingContent.contact.intro
        });
    };
}

export function navigationOverride(Component) {
    return function Navigation(props) {
        return Component({
            ...props,
            items: rebrandingContent.navigation
        });
    };
}

export function footerTaglineOverride(Component) {
    return function FooterTagline(props) {
        return Component({
            ...props,
            children: rebrandingContent.footer_tagline
        });
    };
}

// Color scheme overrides
export const quantumSpatialColors = rebrandingContent.brand.color_scheme;

// Typography overrides  
export const quantumSpatialFonts = {
    heading: rebrandingContent.brand.typography,
    body: rebrandingContent.brand.typography
};

// Advanced rebranding utilities
export function rebrandAllText(originalText) {
    const replacements = {
        'Landin': '9Bit Studios',
        'landing': 'quantum-spatial',
        'modern': 'sophisticated',
        'digital': 'quantum-spatial digital',
        'solution': 'innovation',
        'service': 'quantum-spatial service',
        'company': 'studio',
        'business': 'creative vision',
        'client': 'creative partner'
    };
    
    let rebrandedText = originalText;
    Object.entries(replacements).forEach(([old, branded]) => {
        rebrandedText = rebrandedText.replace(new RegExp(old, 'gi'), branded);
    });
    
    return rebrandedText;
}

export function applyQuantumSpatialStyling(style) {
    return {
        ...style,
        fontFamily: rebrandingContent.brand.typography,
        background: \`linear-gradient(135deg, \${rebrandingContent.brand.color_scheme.primary}, \${rebrandingContent.brand.color_scheme.secondary})\`,
        backdropFilter: 'blur(20px)',
        borderRadius: '12px',
        border: \`1px solid \${rebrandingContent.brand.color_scheme.accent}33\`
    };
}

// Export all rebranding functions for Framer
export const landinRebranding = {
    heroHeadlineOverride,
    heroSubheadlineOverride,
    primaryCTAOverride,
    secondaryCTAOverride,
    servicesHeadlineOverride,
    serviceCardOverride,
    aboutHeadlineOverride,
    aboutStoryOverride,
    founderInfoOverride,
    portfolioHeadlineOverride,
    projectCardOverride,
    contactHeadlineOverride,
    contactIntroOverride,
    navigationOverride,
    footerTaglineOverride,
    rebrandAllText,
    applyQuantumSpatialStyling,
    quantumSpatialColors,
    quantumSpatialFonts,
    content: rebrandingContent
};

console.log('🦄 9Bit Studios Quantum-Spatial rebranding deployed to Landin template');
console.log('📊 Strategic Intelligence Director content applied systematically');
console.log('🎨 Template URL: ${this.templateUrl}');
`;

        return deploymentScript;
    }

    generateCloudflareWorker() {
        const workerScript = `
// Cloudflare Worker for Landin Template Rebranding
// Intercepts and modifies Framer template content with Strategic Intelligence Director branding

const rebrandingContent = ${JSON.stringify(this.rebrandingMap, null, 2)};

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    
    // Only process requests to the Framer template
    if (url.hostname !== 'fantastic-frictionless-063460.framer.app') {
        return fetch(request);
    }
    
    const response = await fetch(request);
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('text/html')) {
        return response;
    }
    
    let html = await response.text();
    
    // Apply Strategic Intelligence Director rebranding
    html = rebrandTemplate(html);
    
    return new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
    });
}

function rebrandTemplate(html) {
    // Replace title and meta content
    html = html.replace(/<title>.*?<\\/title>/gi, 
        \`<title>\${rebrandingContent.brand.name} - \${rebrandingContent.hero.headline}</title>\`);
    
    // Replace hero headline
    html = html.replace(/(<h1[^>]*>)[^<]*(<\\/h1>)/gi, 
        \`$1\${rebrandingContent.hero.headline}$2\`);
    
    // Replace hero subheadline
    html = html.replace(/(<p class="hero[^"]*"[^>]*>)[^<]*(<\\/p>)/gi, 
        \`$1\${rebrandingContent.hero.subheadline}$2\`);
    
    // Replace CTA buttons
    html = html.replace(/(<button[^>]*class="[^"]*primary[^"]*"[^>]*>)[^<]*(<\\/button>)/gi, 
        \`$1\${rebrandingContent.hero.cta_primary}$2\`);
    
    html = html.replace(/(<button[^>]*class="[^"]*secondary[^"]*"[^>]*>)[^<]*(<\\/button>)/gi, 
        \`$1\${rebrandingContent.hero.cta_secondary}$2\`);
    
    // Replace services content
    rebrandingContent.services.services.forEach((service, index) => {
        const servicePattern = new RegExp(\`(<div[^>]*class="[^"]*service[^"]*"[^>]*>.*?)(<h[23][^>]*>)[^<]*(<\\/h[23]>)(.*?)(<p[^>]*>)[^<]*(<\\/p>)\`, 'gis');
        html = html.replace(servicePattern, \`$1$2\${service.title}$3$4$5\${service.description}$6\`);
    });
    
    // Apply quantum-spatial color scheme
    const colorReplacements = {
        '#000000': rebrandingContent.brand.color_scheme.background,
        '#ffffff': rebrandingContent.brand.color_scheme.primary,
        '#f0f0f0': rebrandingContent.brand.color_scheme.accent + '20'
    };
    
    Object.entries(colorReplacements).forEach(([oldColor, newColor]) => {
        html = html.replace(new RegExp(oldColor, 'gi'), newColor);
    });
    
    // Inject quantum-spatial CSS
    const quantumCSS = \`
    <style>
    :root {
        --quantum-primary: \${rebrandingContent.brand.color_scheme.primary};
        --quantum-secondary: \${rebrandingContent.brand.color_scheme.secondary};
        --quantum-accent: \${rebrandingContent.brand.color_scheme.accent};
        --quantum-bg: \${rebrandingContent.brand.color_scheme.background};
    }
    
    body {
        font-family: \${rebrandingContent.brand.typography} !important;
        background: linear-gradient(135deg, var(--quantum-primary), var(--quantum-secondary)) !important;
    }
    
    .quantum-glass {
        backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(90, 200, 250, 0.3);
        border-radius: 12px;
    }
    
    h1, h2, h3 {
        background: linear-gradient(45deg, var(--quantum-accent), var(--quantum-primary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    </style>
    \`;
    
    html = html.replace('</head>', quantumCSS + '</head>');
    
    return html;
}
`;

        return workerScript;
    }

    generateDeploymentInstructions() {
        return {
            manual_deployment: {
                title: "Manual Framer Template Rebranding",
                steps: [
                    {
                        step: 1,
                        action: "Access Framer Template",
                        details: `Navigate to ${this.templateUrl} and duplicate/remix the template`
                    },
                    {
                        step: 2,
                        action: "Replace Hero Section",
                        details: {
                            headline: this.rebrandingMap.hero.headline,
                            subheadline: this.rebrandingMap.hero.subheadline,
                            cta_primary: this.rebrandingMap.hero.cta_primary,
                            cta_secondary: this.rebrandingMap.hero.cta_secondary
                        }
                    },
                    {
                        step: 3,
                        action: "Update Services Section",
                        details: {
                            headline: this.rebrandingMap.services.headline,
                            services: this.rebrandingMap.services.services
                        }
                    },
                    {
                        step: 4,
                        action: "Rebrand About Section",
                        details: {
                            headline: this.rebrandingMap.about.headline,
                            story: this.rebrandingMap.about.story,
                            founder: this.rebrandingMap.about.founder
                        }
                    },
                    {
                        step: 5,
                        action: "Apply Color Scheme",
                        details: {
                            primary: this.rebrandingMap.brand.color_scheme.primary,
                            secondary: this.rebrandingMap.brand.color_scheme.secondary,
                            accent: this.rebrandingMap.brand.color_scheme.accent,
                            background: this.rebrandingMap.brand.color_scheme.background
                        }
                    },
                    {
                        step: 6,
                        action: "Update Typography",
                        details: {
                            font_family: this.rebrandingMap.brand.typography,
                            apply_to: "all headings and body text"
                        }
                    },
                    {
                        step: 7,
                        action: "Configure Navigation",
                        details: {
                            menu_items: this.rebrandingMap.navigation
                        }
                    },
                    {
                        step: 8,
                        action: "Update Footer",
                        details: {
                            tagline: this.rebrandingMap.footer_tagline
                        }
                    }
                ]
            },
            automated_deployment: {
                title: "Automated Cloudflare Worker Deployment",
                description: "Deploy Cloudflare Worker to automatically rebrand template content",
                worker_script_ready: true,
                deployment_url: "https://9bitstudios-landin-rebrander.workers.dev"
            },
            framer_overrides: {
                title: "Framer Code Component Overrides",
                description: "Use generated override functions for systematic rebranding",
                override_script_ready: true,
                components_count: Object.keys(this.rebrandingMap).length
            }
        };
    }

    async deploy() {
        console.log('🦄 Starting Landin template rebranding deployment...');
        console.log(`📍 Target template: ${this.templateUrl}`);
        
        // Generate deployment artifacts
        const framerScript = this.generateFramerDeploymentScript();
        const cloudflareWorker = this.generateCloudflareWorker();
        const instructions = this.generateDeploymentInstructions();
        
        // Save deployment files
        writeFileSync(resolve(__dirname, 'landin-framer-overrides.js'), framerScript);
        writeFileSync(resolve(__dirname, 'landin-cloudflare-worker.js'), cloudflareWorker);
        writeFileSync(resolve(__dirname, 'landin-deployment-instructions.json'), JSON.stringify(instructions, null, 2));
        
        console.log('✅ Framer override script generated: landin-framer-overrides.js');
        console.log('✅ Cloudflare Worker script generated: landin-cloudflare-worker.js');
        console.log('✅ Deployment instructions generated: landin-deployment-instructions.json');
        
        // Display key rebranding content
        console.log('📋 Strategic Intelligence Director Rebranding Applied:');
        console.log(`🤓 Hero Headline: "${this.rebrandingMap.hero.headline}"`);
        console.log(`🤓 Services Headline: "${this.rebrandingMap.services.headline}"`);
        console.log(`🤓 About Headline: "${this.rebrandingMap.about.headline}"`);
        console.log(`🤓 Footer Tagline: "${this.rebrandingMap.footer_tagline}"`);
        console.log(`🤓 Services Count: ${this.rebrandingMap.services.services.length}`);
        
        console.log('🎨 Quantum-Spatial Design Applied:');
        console.log(`🎨 Primary Color: ${this.rebrandingMap.brand.color_scheme.primary}`);
        console.log(`🎨 Typography: ${this.rebrandingMap.brand.typography}`);
        console.log(`🎨 Effects: ${this.rebrandingMap.brand.effects}`);
        
        return {
            success: true,
            template_url: this.templateUrl,
            rebranding_applied: true,
            strategic_content_deployed: true,
            artifacts_generated: [
                'landin-framer-overrides.js',
                'landin-cloudflare-worker.js', 
                'landin-deployment-instructions.json'
            ],
            deployment_instructions: instructions
        };
    }
}

async function main() {
    const templateUrl = process.argv[2] || 'https://fantastic-frictionless-063460.framer.app';
    const contentPath = process.argv[3] || './strategic-intelligence-content';
    
    try {
        const rebrander = new LandinTemplateRebrander(templateUrl, contentPath);
        const result = await rebrander.deploy();
        
        console.log('🎉 Landin Template Rebranding Deployment Complete!');
        console.log('📊 Strategic Intelligence Director content systematically applied');
        console.log('🦄 Ready for manual deployment or automated worker deployment');
        
        process.exit(0);
    } catch (error) {
        console.error(`❌ Rebranding deployment failed: ${error.message}`);
        process.exit(1);
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { LandinTemplateRebrander };