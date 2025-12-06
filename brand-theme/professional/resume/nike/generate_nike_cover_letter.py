#!/usr/bin/env python3
"""Generate professional Nike cover letter PDF for Penny Platt"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from datetime import date

# Create PDF
pdf_file = "/mnt/user-data/outputs/Penny-Platt-Nike-Cover-Letter.pdf"
doc = SimpleDocTemplate(pdf_file, pagesize=letter,
                        topMargin=0.75*inch, bottomMargin=0.75*inch,
                        leftMargin=1*inch, rightMargin=1*inch)

# Container for content
story = []

# Define styles
styles = getSampleStyleSheet()

# Custom styles
header_style = ParagraphStyle(
    'Header',
    parent=styles['Normal'],
    fontSize=10,
    textColor='#333333',
    spaceAfter=4,
    fontName='Helvetica'
)

date_style = ParagraphStyle(
    'Date',
    parent=styles['Normal'],
    fontSize=10,
    textColor='#333333',
    spaceAfter=24,
    fontName='Helvetica'
)

address_style = ParagraphStyle(
    'Address',
    parent=styles['Normal'],
    fontSize=10,
    textColor='#333333',
    spaceAfter=4,
    fontName='Helvetica'
)

salutation_style = ParagraphStyle(
    'Salutation',
    parent=styles['Normal'],
    fontSize=11,
    textColor='#131A36',
    spaceAfter=12,
    fontName='Helvetica'
)

body_style = ParagraphStyle(
    'Body',
    parent=styles['Normal'],
    fontSize=11,
    textColor='#333333',
    spaceAfter=12,
    leading=16,
    fontName='Helvetica',
    alignment=TA_LEFT
)

closing_style = ParagraphStyle(
    'Closing',
    parent=styles['Normal'],
    fontSize=11,
    textColor='#333333',
    spaceAfter=36,
    fontName='Helvetica'
)

signature_style = ParagraphStyle(
    'Signature',
    parent=styles['Normal'],
    fontSize=11,
    textColor='#131A36',
    spaceAfter=24,
    fontName='Helvetica-Bold'
)

footer_style = ParagraphStyle(
    'Footer',
    parent=styles['Normal'],
    fontSize=9,
    textColor='#666666',
    spaceAfter=2,
    fontName='Helvetica-Oblique'
)

# Build content
story.append(Paragraph("Penny Platt", header_style))
story.append(Paragraph("Portland, OR 97206", header_style))
story.append(Paragraph("penny@9bitstudios.io | 503-869-1533", header_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("November 19, 2025", date_style))

story.append(Paragraph("Nike World Headquarters", address_style))
story.append(Paragraph("Attn: Hiring Manager – Graphic Designer 2, Production Artist II", address_style))
story.append(Paragraph("1 Bowerman Drive", address_style))
story.append(Paragraph("Beaverton, OR 97005", address_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Dear Hiring Manager,", salutation_style))

# Body paragraphs
story.append(Paragraph(
    "I'm writing to express my strong interest in the Graphic Designer 2 – Production Artist II position at Nike World Headquarters. "
    "As a Portland-based designer with 20+ years of experience creating production-ready graphics for sports, wellness, and multi-product brands, "
    "I'm excited about the opportunity to contribute to Nike's iconic apparel design legacy.",
    body_style
))

story.append(Paragraph("<b>Sports Content Expertise with Measurable Results</b>", body_style))

story.append(Paragraph(
    "For the past three years, I've served as Creative Director for RunSmart Online, a running coaching platform where I developed a comprehensive "
    "visual system for 1,000+ active athletes. This work directly parallels Nike's apparel production needs:",
    body_style
))

story.append(Paragraph(
    "• <b>Content Strategy & Production:</b> Created 100+ pieces of training content including workout schematics, seasonal campaign graphics, "
    "athlete profiles, and educational infographics—all maintaining rigorous brand consistency across digital and print applications.",
    body_style
))

story.append(Paragraph(
    "• <b>User Journey Optimization:</b> Conducted a complete content audit and designed user journey visualization for the onboarding flow, "
    "resulting in a 40% increase in user engagement and 25% membership growth.",
    body_style
))

story.append(Paragraph(
    "• <b>Systematic Design Execution:</b> Developed production templates for recurring content types (training plans, race prep guides, nutrition content) "
    "that enabled consistent, efficient output while maintaining creative quality.",
    body_style
))

story.append(Paragraph(
    "• <b>Multi-Channel Coordination:</b> Maintained visual coherence across email campaigns, social media, blog graphics, and app interface—"
    "experience that translates directly to Nike's need for consistency across athlete uniforms, retail merchandise, and digital platforms.",
    body_style
))

story.append(Paragraph("<b>Production-Ready Graphics & Technical Precision</b>", body_style))

story.append(Paragraph(
    "My background includes extensive production art experience across multiple industries:",
    body_style
))

story.append(Paragraph(
    "• <b>Petersen Games:</b> Directed design for 100+ SKU product line, creating production specifications for complex multi-component graphics "
    "and managing international creative teams—experience highly relevant to Nike's global production coordination.",
    body_style
))

story.append(Paragraph(
    "• <b>ACHS:</b> Led design for e-commerce platform generating $500K+ annual revenue, creating product photography layouts, promotional graphics, "
    "and seasonal campaigns while maintaining brand consistency across 100+ digital touchpoints.",
    body_style
))

story.append(Paragraph(
    "• <b>Texas Creative:</b> Produced responsive email templates and landing pages with conversion optimization focus, developing brand identity systems "
    "and digital style guides for diverse clients.",
    body_style
))

story.append(Paragraph("<b>Technical Skills & Tools Alignment</b>", body_style))

story.append(Paragraph(
    "I bring expert-level proficiency in Adobe Illustrator and the full Adobe Suite, with particular strength in creating production-ready vector graphics "
    "and detailed schematics. I'm familiar with 3D apparel visualization workflows and have experience with collaborative tools including Smartsheets, Airtable, "
    "and Miro. I'm a quick learner with CLO and other specialized tools, and I thrive in fast-paced environments requiring attention to detail and multi-project management.",
    body_style
))

story.append(Paragraph("<b>Why Nike & Why Now</b>", body_style))

story.append(Paragraph(
    "Nike's commitment to innovation in athletic performance inspires me, and the opportunity to work on apparel graphics that directly impact athletes "
    "resonates deeply with my experience creating content for running coaches and competitive athletes. I understand the intersection of technical specification "
    "requirements and creative expression that makes sports apparel graphics both functional and inspiring.",
    body_style
))

story.append(Paragraph(
    "As a Portland resident, I'm immediately available for the November 23rd start date with no relocation required. The hybrid model aligns perfectly "
    "with my work preferences, and I'm excited about the opportunity to collaborate onsite with Nike's Production Art team while maintaining the focus time "
    "needed for detailed production work.",
    body_style
))

story.append(Paragraph(
    "I'd welcome the opportunity to discuss how my sports content experience, production design expertise, and systematic approach to brand consistency "
    "can contribute to Nike's apparel graphics team. I'm available for an interview at your convenience and can provide work samples demonstrating my relevant "
    "sports and apparel design experience.",
    body_style
))

story.append(Paragraph(
    "Thank you for considering my application. I look forward to the possibility of contributing to Nike's continued excellence in athletic apparel design.",
    body_style
))

story.append(Spacer(1, 0.1*inch))
story.append(Paragraph("Sincerely,", closing_style))
story.append(Paragraph("Penny Platt", signature_style))

# Footer
story.append(Spacer(1, 0.2*inch))
story.append(Paragraph("<b>Portfolio Highlights Available:</b>", footer_style))
story.append(Paragraph("• RunSmart visual brand system and user journey documentation", footer_style))
story.append(Paragraph("• Sports content campaigns (training graphics, athlete profiles, seasonal themes)", footer_style))
story.append(Paragraph("• Multi-product design system examples", footer_style))
story.append(Paragraph("• Production specification documentation", footer_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph("Portfolio: 9bitstudios.io | LinkedIn: linkedin.com/in/pennyplatt", footer_style))

# Build PDF
doc.build(story)
print(f"✓ Cover Letter PDF created: {pdf_file}")
