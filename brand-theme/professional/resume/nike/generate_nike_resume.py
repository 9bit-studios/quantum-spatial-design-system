#!/usr/bin/env python3
"""Generate professional Nike resume PDF for Penny Platt"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.pdfgen import canvas

# Create PDF
pdf_file = "/mnt/user-data/outputs/Penny-Platt-Nike-Resume.pdf"
doc = SimpleDocTemplate(pdf_file, pagesize=letter,
                        topMargin=0.5*inch, bottomMargin=0.5*inch,
                        leftMargin=0.75*inch, rightMargin=0.75*inch)

# Container for content
story = []

# Define styles
styles = getSampleStyleSheet()

# Custom styles
title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=24,
    textColor='#131A36',  # Deep Space Indigo
    spaceAfter=4,
    alignment=TA_CENTER,
    fontName='Helvetica-Bold'
)

subtitle_style = ParagraphStyle(
    'CustomSubtitle',
    parent=styles['Normal'],
    fontSize=10,
    textColor='#333333',
    spaceAfter=12,
    alignment=TA_CENTER,
    fontName='Helvetica'
)

heading_style = ParagraphStyle(
    'CustomHeading',
    parent=styles['Heading2'],
    fontSize=12,
    textColor='#131A36',
    spaceAfter=8,
    spaceBefore=12,
    fontName='Helvetica-Bold',
    borderWidth=0,
    borderPadding=2,
    borderColor='#613FE7',  # Ultra Violet
    borderRadius=0
)

job_title_style = ParagraphStyle(
    'JobTitle',
    parent=styles['Normal'],
    fontSize=11,
    textColor='#131A36',
    spaceAfter=2,
    fontName='Helvetica-Bold'
)

company_style = ParagraphStyle(
    'Company',
    parent=styles['Normal'],
    fontSize=10,
    textColor='#666666',
    spaceAfter=6,
    fontName='Helvetica-Oblique'
)

body_style = ParagraphStyle(
    'CustomBody',
    parent=styles['Normal'],
    fontSize=10,
    textColor='#333333',
    spaceAfter=4,
    leading=14,
    fontName='Helvetica'
)

bullet_style = ParagraphStyle(
    'CustomBullet',
    parent=styles['Normal'],
    fontSize=10,
    textColor='#333333',
    spaceAfter=4,
    leftIndent=20,
    bulletIndent=10,
    leading=13,
    fontName='Helvetica'
)

# Build content
story.append(Paragraph("PENNY PLATT", title_style))
story.append(Paragraph("Graphic Designer | Brand Systems | Sports & Apparel Content", subtitle_style))
story.append(Paragraph(
    "Portland, OR | penny@9bitstudios.io | 503-869-1533<br/>"
    "Portfolio: 9bitstudios.io | LinkedIn: linkedin.com/in/pennyplatt",
    subtitle_style
))
story.append(Spacer(1, 0.15*inch))

# Professional Summary
story.append(Paragraph("PROFESSIONAL SUMMARY", heading_style))
story.append(Paragraph(
    "Graphic designer with 20+ years creating production-ready visual systems, brand campaigns, and sports-focused content. "
    "Proven track record designing for athletic brands and wellness platforms with measurable engagement results. "
    "Expertise in Adobe Creative Suite, systematic brand execution, and multi-product content workflows. "
    "Detail-oriented production artist comfortable managing multiple projects across retail, digital, and apparel applications.",
    body_style
))
story.append(Spacer(1, 0.1*inch))

# Core Competencies
story.append(Paragraph(
    "<b>Core Competencies:</b> Production-Ready Graphics & Schematics • Sports & Apparel Visual Content • "
    "Brand System Development & Maintenance • Adobe Illustrator, Photoshop, InDesign • "
    "Content Audits & User Journey Mapping • Multi-Channel Campaign Design • Documentation & Process Optimization",
    body_style
))
story.append(Spacer(1, 0.1*inch))

# Experience
story.append(Paragraph("RELEVANT PROFESSIONAL EXPERIENCE", heading_style))

# 9Bit Studios
story.append(Paragraph("Creative Director & UX Designer | 9Bit Studios", job_title_style))
story.append(Paragraph("January 2021 – Present | Portland, OR", company_style))

story.append(Paragraph("<b>RunSmart Online – Sports Content & Conversion Optimization</b>", body_style))
story.append(Paragraph(
    "• Designed comprehensive content strategy and visual system for running coaching platform serving 1,000+ active athletes",
    bullet_style
))
story.append(Paragraph(
    "• Created brand campaign themes, promotional graphics, and educational content for training programs across 100+ pieces",
    bullet_style
))
story.append(Paragraph(
    "• Conducted full content audit and developed user journey visualization for onboarding flow optimization",
    bullet_style
))
story.append(Paragraph(
    "• Designed coach profile graphics, training plan layouts, and membership tier visual hierarchy",
    bullet_style
))
story.append(Paragraph(
    "• <b>Results: 40% increase in user engagement, 25% membership growth</b> through systematic visual design and content strategy",
    bullet_style
))
story.append(Paragraph(
    "• Developed production templates for recurring content types (weekly training tips, race prep guides, nutrition content)",
    bullet_style
))
story.append(Paragraph(
    "• Maintained brand consistency across email campaigns, social media, blog graphics, and app interface",
    bullet_style
))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>Key Production Design Deliverables:</b>", body_style))
story.append(Paragraph(
    "• Training plan schematics and workout visualization graphics • Athlete testimonial layouts and success story templates • "
    "Seasonal campaign graphics (marathon training, trail running, speed work series) • Educational infographics for running mechanics, "
    "injury prevention, nutrition timing • Social media content templates for Instagram, Facebook, Twitter • "
    "Email header graphics and promotional banner systems",
    bullet_style
))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>ACHS (American College of Healthcare Sciences) – Wellness Education Platform</b>", body_style))
story.append(Paragraph(
    "• Led UX/UI design for learning management system serving 5,000+ students",
    bullet_style
))
story.append(Paragraph(
    "• Designed e-commerce graphics for Shopify platform generating $500K+ annual revenue",
    bullet_style
))
story.append(Paragraph(
    "• Created product photography layouts, promotional graphics, and seasonal campaign visuals",
    bullet_style
))
story.append(Paragraph(
    "• Maintained brand consistency across 100+ digital touchpoints",
    bullet_style
))
story.append(Paragraph(
    "• Developed course catalog layouts and student resource graphics",
    bullet_style
))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>Petersen Games – Multi-Product Brand System</b>", body_style))
story.append(Paragraph(
    "• Directed design for board game products with complex multi-component graphics",
    bullet_style
))
story.append(Paragraph(
    "• Created production specifications for 100+ SKU product line",
    bullet_style
))
story.append(Paragraph(
    "• Designed Kickstarter campaign graphics generating $2M+ in funding",
    bullet_style
))
story.append(Paragraph(
    "• Managed international creative team producing game art, packaging, and promotional materials",
    bullet_style
))
story.append(Spacer(1, 0.15*inch))

# Previous positions (condensed)
story.append(Paragraph("Art Director | American College of Healthcare Sciences", job_title_style))
story.append(Paragraph("January 2018 – January 2021 | Portland, OR", company_style))
story.append(Paragraph(
    "Led brand visual identity across digital and print platforms • Designed promotional materials for holistic health education programs • "
    "Created student resource graphics and course marketing materials • Maintained brand guidelines and design system documentation",
    bullet_style
))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("Art Director | Petersen Games", job_title_style))
story.append(Paragraph("January 2016 – January 2018 | Rockwall, TX", company_style))
story.append(Paragraph(
    "Directed design for Kickstarter campaigns generating $2M+ funding • Managed team of 15+ illustrators, sculptors, and designers • "
    "Created design systems for product lines with 100+ SKUs • Designed packaging, rulebook layouts, promotional graphics, and retail displays",
    bullet_style
))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("Senior Designer | Texas Creative", job_title_style))
story.append(Paragraph("January 2014 – April 2016 | Austin, TX", company_style))
story.append(Paragraph(
    "Created responsive email templates and landing pages for conversion optimization • Developed brand identity systems and digital style guides • "
    "Designed marketing campaigns across multiple channels • Produced production-ready files for digital and print execution",
    bullet_style
))
story.append(Spacer(1, 0.15*inch))

# Page break for second page
story.append(PageBreak())

# Technical Skills
story.append(Paragraph("TECHNICAL SKILLS", heading_style))

story.append(Paragraph("<b>Adobe Creative Suite (Expert):</b>", body_style))
story.append(Paragraph(
    "• Illustrator (production art, vector graphics, technical schematics) • Photoshop (image editing, compositing, digital mockups) • "
    "InDesign (multi-page layouts, documentation, print production)",
    bullet_style
))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>Design & Production:</b>", body_style))
story.append(Paragraph(
    "• Production-ready file preparation • Vector graphic creation and optimization • Color management and print specifications • "
    "Multi-format asset generation • Design system maintenance",
    bullet_style
))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>Workflow & Collaboration:</b>", body_style))
story.append(Paragraph(
    "• Smartsheets (project tracking) • Airtable (content databases) • Miro (collaborative design thinking) • "
    "Figma (design systems, prototyping) • Notion (documentation, process guides)",
    bullet_style
))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>3D & Visualization:</b>", body_style))
story.append(Paragraph(
    "• Familiar with 3D apparel workflows and mockup tools • Experience with product visualization and rendering",
    bullet_style
))
story.append(Spacer(1, 0.15*inch))

# Project Highlights
story.append(Paragraph("RELEVANT PROJECT HIGHLIGHTS", heading_style))

story.append(Paragraph("<b>RunSmart Content Ecosystem</b>", body_style))
story.append(Paragraph(
    "Complete visual brand system for sports coaching platform • Training content graphics, athlete profiles, seasonal campaigns • "
    "User journey mapping from content audit insights • Email, social, web, and app interface consistency • "
    "Measurable 40% engagement increase through visual optimization",
    bullet_style
))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>Sports & Wellness Visual Content</b>", body_style))
story.append(Paragraph(
    "Running training infographics and workout schematics • Athlete photography and testimonial layouts • "
    "Race preparation guide graphics • Nutrition timing charts and educational diagrams • Injury prevention visual guides",
    bullet_style
))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>Multi-Product Brand Systems</b>", body_style))
story.append(Paragraph(
    "Design systems managing 100+ SKUs with component variations • Production specifications and technical documentation • "
    "Team collaboration across multiple production artists • Quality control and brand consistency enforcement",
    bullet_style
))
story.append(Spacer(1, 0.15*inch))

# Education
story.append(Paragraph("EDUCATION & CERTIFICATIONS", heading_style))

story.append(Paragraph("<b>Bachelor of Arts, Communication Design</b>", body_style))
story.append(Paragraph("University of Texas at San Antonio | 2010-2012", company_style))
story.append(Spacer(1, 0.05*inch))

story.append(Paragraph("<b>Associate of Applied Science, Visual Communications</b>", body_style))
story.append(Paragraph("Collin College | 1995-1998", company_style))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>Professional Certifications:</b>", body_style))
story.append(Paragraph(
    "• HubSpot: Content Marketing, Social Media, Inbound Marketing, Email Marketing<br/>"
    "• Interaction Design Foundation: Agile Methods for UX, Journey Mapping, UX Foundations",
    bullet_style
))
story.append(Spacer(1, 0.15*inch))

# Additional Strengths
story.append(Paragraph("ADDITIONAL STRENGTHS", heading_style))
story.append(Paragraph(
    "<b>Production Workflow Efficiency:</b> Systematic approach to multi-project management with attention to deadline prioritization",
    bullet_style
))
story.append(Paragraph(
    "<b>Sports Content Understanding:</b> Experience creating authentic athletic brand content with performance focus",
    bullet_style
))
story.append(Paragraph(
    "<b>Documentation Excellence:</b> Strong technical writing and process documentation skills",
    bullet_style
))
story.append(Paragraph(
    "<b>Collaborative Communication:</b> Experience working with cross-functional teams and international creative professionals",
    bullet_style
))
story.append(Paragraph(
    "<b>Detail-Oriented Quality:</b> Meticulous file preparation and brand guideline adherence",
    bullet_style
))
story.append(Paragraph(
    "<b>Adaptable Problem-Solver:</b> Quick learner comfortable navigating ambiguity and new tools",
    bullet_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("<i>References available upon request</i>", ParagraphStyle(
    'Italic',
    parent=body_style,
    alignment=TA_CENTER,
    fontSize=9
)))

# Build PDF
doc.build(story)
print(f"✓ Resume PDF created: {pdf_file}")
