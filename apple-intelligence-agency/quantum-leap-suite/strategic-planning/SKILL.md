---
name: strategic-planning
description: Executive-level product roadmap generation and technical planning. Use when planning features, coordinating multi-project workflows, prioritizing tasks, or creating technical architecture. Provides Product Director-level strategic guidance.
---

# Strategic Planning Skill

## Purpose

Generate executive-level product roadmaps, technical architecture plans, and strategic prioritization frameworks for complex software development initiatives.

## When to Use This Skill

- Planning new features or major product initiatives
- Creating multi-project coordination roadmaps
- Prioritizing tasks using impact/effort matrices
- Designing technical architecture for complex systems
- Assessing feasibility and resource requirements
- Identifying risks and mitigation strategies

## Core Capabilities

### 1. Product Roadmap Generation

Create comprehensive roadmaps with:
- **Timeline Estimation**: Realistic weekly/monthly phasing
- **Dependencies Mapping**: Identify blockers and prerequisites
- **Resource Allocation**: Estimate development time and team needs
- **Success Metrics**: Define measurable outcomes
- **Risk Assessment**: Identify potential challenges early

### 2. Priority Matrix Framework

Use the Impact vs Effort matrix:

```
High Impact, Low Effort → Execute Immediately
High Impact, High Effort → Plan Thoroughly
Low Impact, Low Effort → Batch & Delegate
Low Impact, High Effort → Defer or Reject
```

### 3. Technical Architecture Planning

Design system architectures with:
- **Technology Stack Selection**: Choose appropriate tools
- **Integration Patterns**: API design, data flows
- **Scalability Considerations**: Growth planning
- **Security Requirements**: Privacy-first, quantum-secure
- **Performance Targets**: M4 optimization goals

## Strategic Planning Template

Use this template for feature planning:

```markdown
## Feature: [Name]

### Executive Summary
**Impact**: [High/Medium/Low]
**Effort**: [High/Medium/Low]
**Priority**: [Critical/High/Medium/Low]
**Timeline**: [X weeks]

### Business Objectives
- [Primary goal]
- [Secondary goals]
- [Success metrics]

### Technical Architecture

#### Technology Stack
- Frontend: [SwiftUI/React/Next.js]
- Backend: [Next.js API Routes/Cloudflare Workers]
- Database: [Supabase/Prisma]
- APIs: [Shopify/Anthropic/Custom]

#### System Design
```
[User Interface]
      ↓
[Application Layer]
      ↓
[Business Logic]
      ↓
[Data Layer]
      ↓
[External Services]
```

#### Integration Points
- [Service 1]: [Purpose]
- [Service 2]: [Purpose]

### Implementation Phases

#### Phase 1: Foundation (Week 1-2)
- [ ] Set up project structure
- [ ] Configure dependencies
- [ ] Create base components

#### Phase 2: Core Features (Week 3-4)
- [ ] Implement main functionality
- [ ] Add error handling
- [ ] Create tests

#### Phase 3: Integration (Week 5)
- [ ] Connect external services
- [ ] Validate data flows
- [ ] Performance optimization

#### Phase 4: Polish & Launch (Week 6)
- [ ] UI/UX refinement
- [ ] Accessibility validation
- [ ] Deployment preparation

### Resource Requirements

#### Development Time
- Frontend: [X hours]
- Backend: [X hours]
- Testing: [X hours]
- **Total**: [X hours]

#### External Services
- [Service]: [Cost/month]
- [API]: [Rate limits]

#### Design Assets
- [Figma components needed]
- [Design system tokens required]

### Risk Analysis

#### Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Strategy] |
| [Risk 2] | High/Med/Low | High/Med/Low | [Strategy] |

#### Business Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Strategy] |

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| [Performance] | [Goal] | [How to measure] |
| [User Experience] | [Goal] | [How to measure] |
| [Business Impact] | [Goal] | [How to measure] |

### Dependencies

**Blockers** (must complete first):
- [ ] [Dependency 1]
- [ ] [Dependency 2]

**Nice-to-Have** (can proceed without):
- [ ] [Enhancement 1]
- [ ] [Enhancement 2]

### Validation Checklist

Before deployment approval:
- [ ] Apple HIG compliance verified
- [ ] M4 optimization validated
- [ ] Type safety confirmed (no TS errors)
- [ ] Security audit passed
- [ ] Accessibility validated (WCAG AA)
- [ ] Brand consistency confirmed
- [ ] Performance benchmarks met
- [ ] Error handling comprehensive

### Next Steps

1. [Immediate action]
2. [Follow-up task]
3. [Long-term consideration]
```

## Apple HIG Planning Guidelines

When planning UI components:

**Touch Targets**:
- Minimum 44px × 44px for all interactive elements
- 8px minimum spacing between targets
- Extra padding on mobile screens

**Typography**:
- SF Pro Display for headings
- SF Pro Text for body content
- Minimum 11pt, 17pt recommended

**Accessibility**:
- 4.5:1 contrast ratio for body text
- Semantic HTML / SwiftUI structures
- VoiceOver / screen reader support
- Dynamic Type support

## M4 Neural Engine Planning

Factor in M4 optimization:

**Performance Targets**:
- Design parsing: <2 seconds
- Code generation: <30 seconds
- Token processing: <1 second
- API response: <500ms

**Resource Planning**:
- Memory: Optimize for 16GB baseline
- CPU: Leverage 16 Neural Engine cores
- Storage: 5GB per container
- Concurrency: Parallel agent execution

## Multi-Project Coordination

When coordinating across projects:

1. **Identify Shared Dependencies**:
   - Common components
   - Shared services
   - Design system tokens

2. **Timeline Synchronization**:
   - Align release schedules
   - Coordinate resource allocation
   - Plan integration points

3. **Communication Protocol**:
   - Weekly sync meetings
   - Shared documentation
   - Status updates

## Example: Petersen Games Product Card Planning

```markdown
## Feature: Premium Petersen Games Product Card

### Executive Summary
**Impact**: High (Core e-commerce component)
**Effort**: Medium (2-3 weeks)
**Priority**: Critical
**Timeline**: 3 weeks

### Technical Architecture
- **Platform**: SwiftUI (iOS/macOS) + React (Web)
- **Design System**: Quantum Spatial tokens
- **APIs**: Shopify Storefront GraphQL
- **Brand Voice**: Oksana Creative Intelligence

### Phase 1: Design & Planning (Week 1)
- Extract Figma components via MCP
- Generate brand-aligned copy
- Define data models

### Phase 2: Implementation (Week 2)
- Build SwiftUI component
- Create React web version
- Integrate Shopify API

### Phase 3: Validation & Launch (Week 3)
- Apple HIG compliance check
- Brand voice validation
- Performance optimization
- Deploy to production

### Success Metrics
- Load time: <500ms
- Conversion rate: +15% vs current
- Brand alignment: >90 score
- HIG compliance: 100%
```

## Tips for Effective Planning

1. **Start with Business Goals**: Always tie technical work to business outcomes
2. **Be Realistic**: Account for unexpected challenges (add 20% buffer)
3. **Consider Dependencies**: Map out all prerequisites early
4. **Plan for Validation**: Build QA time into timeline
5. **Document Decisions**: Explain why you chose specific approaches
6. **Think Long-Term**: Consider maintainability and scalability

## Collaboration with Other Agents

**With Oksana Creative**:
- Request brand voice validation for user-facing features
- Get agency-level copy for product descriptions
- Validate tone consistency across touchpoints

**With Figma Visual**:
- Request component implementations based on architecture
- Get HIG compliance validation
- Coordinate design system usage

## References

- Project foundation: `/apple-intelligence/foundation/`
- Design system: `/quantum-spatial/design-system/`
- Live implementations: `/quantum-spatial/creative-intelligence-portal/`
- Executive roadmap: `/strategic-director-executive-roadmap.md`

---

**Use this skill when you need Product Director-level strategic planning, technical architecture design, or multi-project coordination.**
