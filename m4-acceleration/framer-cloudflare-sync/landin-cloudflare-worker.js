
// Cloudflare Worker for Landin Template Rebranding
// Intercepts and modifies Framer template content with Strategic Intelligence Director branding

const rebrandingContent = {
  "hero": {
    "headline": "Transform Your Digital Vision with Quantum-Spatial Innovation",
    "subheadline": "We create immersive experiences that bridge possibility and reality through Apple Intelligence and quantum-spatial design.",
    "cta_primary": "Start Your Quantum Journey",
    "cta_secondary": "Explore Our Portfolio"
  },
  "services": {
    "headline": "Our Quantum-Spatial Services",
    "services": [
      {
        "title": "Vision Pro Innovation",
        "description": "Next-generation spatial computing experiences",
        "features": [
          "Immersive interfaces",
          "Spatial design systems",
          "Apple Intelligence integration"
        ]
      },
      {
        "title": "iOS Game Development",
        "description": "Narrative-driven mobile experiences with quantum aesthetics",
        "features": [
          "Interactive storytelling",
          "M4 optimization",
          "CloudKit integration"
        ]
      },
      {
        "title": "AI-Powered Automation",
        "description": "Privacy-first intelligent workflows",
        "features": [
          "Brand-aware content",
          "Workflow automation",
          "Apple Intelligence"
        ]
      }
    ]
  },
  "about": {
    "headline": "Pioneering Quantum-Spatial Innovation",
    "story": "9Bit Studios emerges from the intersection of possibility and reality, where quantum-spatial innovation meets Apple Intelligence. Founded by creative visionaries who understand that technology should amplify human creativity rather than replace it, we specialize in crafting digital experiences that feel both familiar and revolutionary.Our approach combines the precision of quantum-spatial design with the intuitive nature of Apple's ecosystem, creating solutions that are not just functional, but transformative. Every project we undertake reflects our commitment to privacy-first principles, sophisticated aesthetics, and meaningful innovation.",
    "founder": {
      "name": "Penny Platt",
      "title": "Creative Director & Strategic Visionary",
      "bio": "Co-founder of 9Bit Studios, pioneering the intersection of Apple Intelligence and quantum-spatial design."
    }
  },
  "portfolio": {
    "headline": "Recent Quantum Creations",
    "projects": [
      {
        "name": "Petersen Games Portal",
        "type": "E-commerce Integration",
        "description": "Shopify-powered platform with quantum aesthetics"
      },
      {
        "name": "Oksana Creative Intelligence",
        "type": "AI Platform",
        "description": "Brand-aware content generation with Apple Intelligence"
      }
    ]
  },
  "contact": {
    "headline": "Begin Your Quantum Journey",
    "intro": "Ready to transform your digital presence with quantum-spatial innovation?",
    "methods": [
      {
        "type": "consultation",
        "label": "Schedule Strategic Consultation"
      },
      {
        "type": "email",
        "label": "Direct Communication"
      },
      {
        "type": "portfolio",
        "label": "Request Portfolio Review"
      }
    ]
  },
  "servicesPage": {
    "headline": "Quantum-Spatial Digital Experiences",
    "intro": "Our quantum-spatial innovation approach combines privacy-first principles with cutting-edge technology to create sophisticated digital experiences.",
    "categories": [
      {
        "category": "Game Development",
        "packages": [
          {
            "name": "Starter Package",
            "price": "$15,000",
            "description": "Prototype design and proof of concept",
            "features": [
              "Simple environments",
              "Basic mechanics",
              "One round of revisions"
            ]
          },
          {
            "name": "Core Package",
            "price": "$50,000",
            "description": "Fully functional game with 3-5 levels",
            "features": [
              "Custom UI design",
              "Basic soundscapes",
              "iOS and desktop optimization"
            ]
          },
          {
            "name": "Comprehensive RPG Package",
            "price": "Custom pricing",
            "description": "Expansive world-building and multiplayer integration",
            "features": [
              "Custom assets",
              "Sound design",
              "Animation",
              "Ongoing support"
            ]
          }
        ],
        "starting_price": "$15,000"
      },
      {
        "category": "Web Development",
        "packages": [
          {
            "name": "Essential Framer",
            "price": "$5,000",
            "description": "Up to 5 core pages with quantum-spatial design",
            "features": [
              "Custom responsive design",
              "SEO optimization",
              "Analytics integration",
              "30 days support"
            ]
          },
          {
            "name": "Premium AI-Enhanced",
            "price": "$12,000",
            "description": "Intelligent features and automated content systems",
            "features": [
              "AI-powered chat support",
              "Dynamic content generation",
              "Advanced analytics",
              "A/B testing"
            ]
          },
          {
            "name": "Membership Portal",
            "price": "$20,000",
            "description": "Complete subscription-based platform",
            "features": [
              "Member management",
              "Content gating",
              "Community features",
              "Payment processing"
            ]
          }
        ],
        "starting_price": "$5,000"
      },
      {
        "category": "AI Innovation",
        "packages": [
          {
            "name": "AI Innovation Suite",
            "price": "$15,000",
            "description": "Custom AI-powered productivity enhancement",
            "features": [
              "Custom iOS apps",
              "AI content generation",
              "Branded assistants",
              "OpenAI/Claude integration"
            ]
          },
          {
            "name": "Enterprise Portals",
            "price": "$20,000",
            "description": "Powerful web applications on Next.js",
            "features": [
              "Custom SaaS development",
              "Client portals",
              "Team collaboration",
              "Analytics dashboard"
            ]
          }
        ],
        "starting_price": "$15,000"
      }
    ]
  },
  "navigation": [
    "Services",
    "Portfolio",
    "About",
    "Blog",
    "Contact"
  ],
  "footer_tagline": "Transforming possibility into reality through quantum-spatial innovation",
  "brand": {
    "name": "9Bit Studios",
    "color_scheme": {
      "version": "1.0.0",
      "colors": {
        "primary": {
          "main": "#6A3093",
          "dark": "#331F4A",
          "light": "#613FE7",
          "contrastText": "#FFFFFF"
        },
        "secondary": {
          "main": "#BF4080",
          "dark": "#331F4A",
          "light": "#FF2D55",
          "contrastText": "#FFFFFF"
        },
        "accent": {
          "main": "#5AC8FA",
          "dark": "#126D71",
          "light": "#00FFC8",
          "contrastText": "#131A36"
        },
        "background": {
          "default": "#131A36",
          "paper": "#0D0D15",
          "subtle": "#0A0621"
        },
        "text": {
          "primary": "#FFFFFF",
          "secondary": "#CCCCCC",
          "disabled": "#888888",
          "hint": "#AAAAAA"
        },
        "semantic": {
          "success": "#34C759",
          "warning": "#FF9500",
          "error": "#FF3B30",
          "info": "#5AC8FA"
        }
      },
      "typography": {
        "fontFamilies": {
          "heading": "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          "body": "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
          "mono": "'SF Mono', 'JetBrains Mono', monospace"
        },
        "fontSizes": {
          "xs": "12px",
          "sm": "14px",
          "md": "16px",
          "lg": "20px",
          "xl": "24px",
          "xxl": "32px",
          "display": "48px"
        },
        "fontWeights": {
          "regular": 400,
          "medium": 500,
          "semibold": 600,
          "bold": 700
        },
        "lineHeights": {
          "xs": "16px",
          "sm": "20px",
          "md": "24px",
          "lg": "28px",
          "xl": "32px",
          "xxl": "40px",
          "display": "56px"
        },
        "letterSpacings": {
          "tighter": "-0.05em",
          "tight": "-0.025em",
          "normal": "0",
          "wide": "0.025em",
          "wider": "0.05em"
        }
      },
      "spacing": {
        "quantum": "4px",
        "xxs": "4px",
        "xs": "8px",
        "sm": "16px",
        "md": "24px",
        "lg": "32px",
        "xl": "48px",
        "xxl": "64px"
      },
      "borders": {
        "radius": {
          "xs": "2.4px",
          "sm": "4.8px",
          "md": "9.6px",
          "lg": "14.399999999999999px",
          "xl": "19.2px",
          "pill": "9999px"
        },
        "width": {
          "thin": "1px",
          "medium": "2px",
          "thick": "3px"
        }
      },
      "shadows": {
        "subtle": "0 2px 4px rgba(10, 6, 33, 0.3)",
        "medium": "0 4px 8px rgba(10, 6, 33, 0.3), 0 0 8px rgba(191, 64, 128, 0.2)",
        "prominent": "0 8px 16px rgba(10, 6, 33, 0.3), 0 0 16px rgba(191, 64, 128, 0.2)",
        "glow": "0 0 20px rgba(191, 64, 128, 0.2)"
      },
      "opacities": {
        "subtle": 0.7,
        "verySubtle": 0.3,
        "hover": 0.85,
        "active": 0.95,
        "disabled": 0.5
      },
      "grid": {
        "size": {
          "fine": "8px",
          "medium": "16px",
          "coarse": "32px"
        },
        "types": {
          "background": {
            "opacity": 0.08
          },
          "interface": {
            "opacity": 0.15
          },
          "feature": {
            "opacity": 0.2
          }
        },
        "perspective": {
          "default": "1000px",
          "subtle": "2000px",
          "extreme": "500px"
        }
      },
      "animation": {
        "durations": {
          "instant": "40ms",
          "fast": "120ms",
          "medium": "240ms",
          "slow": "400ms",
          "deliberate": "640ms"
        },
        "easings": {
          "standard": "cubic-bezier(0.4, 0.0, 0.2, 1)",
          "decelerate": "cubic-bezier(0.0, 0.0, 0.2, 1)",
          "accelerate": "cubic-bezier(0.4, 0.0, 1, 1)",
          "quantum": "cubic-bezier(0.16, 1, 0.3, 1)",
          "energy": "cubic-bezier(0.17, 0.89, 0.32, 1.25)"
        }
      },
      "quantumMaterial": {
        "roughness": 0.2,
        "metallic": 0.8,
        "emission": 0.7,
        "pixelation": 0
      }
    },
    "typography": "SF Pro Display system font stack",
    "effects": "Liquid glass morphism with quantum transitions"
  }
};

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
    html = html.replace(/<title>.*?<\/title>/gi, 
        `<title>${rebrandingContent.brand.name} - ${rebrandingContent.hero.headline}</title>`);
    
    // Replace hero headline
    html = html.replace(/(<h1[^>]*>)[^<]*(<\/h1>)/gi, 
        `$1${rebrandingContent.hero.headline}$2`);
    
    // Replace hero subheadline
    html = html.replace(/(<p class="hero[^"]*"[^>]*>)[^<]*(<\/p>)/gi, 
        `$1${rebrandingContent.hero.subheadline}$2`);
    
    // Replace CTA buttons
    html = html.replace(/(<button[^>]*class="[^"]*primary[^"]*"[^>]*>)[^<]*(<\/button>)/gi, 
        `$1${rebrandingContent.hero.cta_primary}$2`);
    
    html = html.replace(/(<button[^>]*class="[^"]*secondary[^"]*"[^>]*>)[^<]*(<\/button>)/gi, 
        `$1${rebrandingContent.hero.cta_secondary}$2`);
    
    // Replace services content
    rebrandingContent.services.services.forEach((service, index) => {
        const servicePattern = new RegExp(`(<div[^>]*class="[^"]*service[^"]*"[^>]*>.*?)(<h[23][^>]*>)[^<]*(<\/h[23]>)(.*?)(<p[^>]*>)[^<]*(<\/p>)`, 'gis');
        html = html.replace(servicePattern, `$1$2${service.title}$3$4$5${service.description}$6`);
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
    const quantumCSS = `
    <style>
    :root {
        --quantum-primary: ${rebrandingContent.brand.color_scheme.primary};
        --quantum-secondary: ${rebrandingContent.brand.color_scheme.secondary};
        --quantum-accent: ${rebrandingContent.brand.color_scheme.accent};
        --quantum-bg: ${rebrandingContent.brand.color_scheme.background};
    }
    
    body {
        font-family: ${rebrandingContent.brand.typography} !important;
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
    `;
    
    html = html.replace('</head>', quantumCSS + '</head>');
    
    return html;
}
