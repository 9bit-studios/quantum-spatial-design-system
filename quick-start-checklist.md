# Quick Start Checklist: Apple Intelligence Agency Migration

**Date:** 2025-11-18
**Estimated Time:** 5-10 minutes
**Complexity:** Low (automated)

---

## ✅ Pre-Migration Checklist

- [x] Migration script exists: `tools/scripts/move-apple-intelligence-agency.sh`
- [x] Script is executable: `chmod +x` applied
- [x] Source directory verified: `/apple-intelligence-agency/` exists
- [x] Destination ready: `/design-system/` exists
- [x] Documentation prepared: `MIGRATION_EXECUTION_SUMMARY.md`

**Status: READY TO EXECUTE** ✅

---

## 🚀 Execution (3 Commands)

### 1. Navigate to Design System
```bash
cd /Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system
```

### 2. Run Migration Script
```bash
./tools/scripts/move-apple-intelligence-agency.sh
```

**You'll be prompted:**
- Confirm migration: Type `y` and press Enter
- Script will run 4 automated steps
- Watch for green ✓ checkmarks

### 3. Verify Success
```bash
cd apple-intelligence-agency
ls -la
cat INTEGRATION.md
```

**Expected output:**
- Directory with 11+ skill subdirectories
- Integration documentation
- All core framework files

---

## 📋 What The Script Does (Automated)

**Step 1/4:** Moving directory
- Copies entire `/apple-intelligence-agency/` to `/design-system/apple-intelligence-agency/`
- Preserves all files, permissions, structure

**Step 2/4:** Verifying structure
- Checks for `quantum-leap-suite/`
- Validates 11 skill directories exist
- Confirms core files present

**Step 3/4:** Creating documentation
- Generates `INTEGRATION.md`
- Documents all skills and capabilities
- Provides integration points with design system

**Step 4/4:** Updating README
- Backs up existing `README.md` → `README.md.backup`
- Adds Apple Intelligence Agency section
- Links to integration documentation

---

## ✅ Post-Migration Checklist

### Immediate Verification (Required)

- [ ] Directory exists: `ls apple-intelligence-agency/`
- [ ] Integration doc created: `cat apple-intelligence-agency/INTEGRATION.md`
- [ ] Quantum Leap Suite intact: `ls apple-intelligence-agency/quantum-leap-suite/`
- [ ] Skills present: Count 11 subdirectories
- [ ] Core files exist: `agent-skill-registry.ts`, `quantum-leap-orchestrator.ts`

### Test Skills (Recommended)

```bash
cd apple-intelligence-agency/quantum-leap-suite

# List available skills (No SDK required)
./list-skills.sh
```

**Expected output:**
```
╔════════════════════════════════════════════════════════════╗
║   Quantum Leap Suite - Available Skills (No SDK)          ║
╚════════════════════════════════════════════════════════════╝

Design & Generation Skills:

1. svg-generation
   📄 Documentation: SKILL.md
2. vision-pro-ui-kit
   📄 Documentation: SKILL.md
3. design-system-automation
   📄 Documentation: SKILL.md
4. hexecute-game
5. brand-voice-validation
6. strategic-planning
```

### Review Documentation (Recommended)

- [ ] Read: `apple-intelligence-agency/INTEGRATION.md`
- [ ] Review: `apple-intelligence-agency/quantum-leap-suite/CLAUDE.md`
- [ ] Check: Updated design system `README.md`

### Optional: Test Orchestrator

```bash
cd apple-intelligence-agency/quantum-leap-suite

# Test SVG generation (pseudo-skill mode)
npx tsx quantum-leap-orchestrator.ts --svg-only
```

---

## 🎯 Success Criteria

Migration is successful when ALL of these are true:

1. ✅ No errors during script execution
2. ✅ `apple-intelligence-agency/` directory exists in design system
3. ✅ `INTEGRATION.md` created and readable
4. ✅ `npx tsx agent-skill-registry.ts list` shows 6+ skills
5. ✅ Design system `README.md` references apple-intelligence-agency

---

## 🧹 Cleanup (After Verification)

**⚠️ ONLY after confirming migration succeeded!**

### Remove Original Directory

```bash
# Verify new location works first
cd /Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system/apple-intelligence-agency
ls -la
cat INTEGRATION.md

# If everything looks good, remove original
rm -rf /Users/pennyplatt/Documents/9BitStudios/Oksana/apple-intelligence-agency
```

**DO NOT remove original until you've:**
- [x] Verified all files migrated
- [x] Tested skill registry
- [x] Confirmed integration documentation exists
- [x] Read through and validated key files

---

## 🔧 Troubleshooting

### Issue: Script won't run
```bash
# Make executable
chmod +x /Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system/tools/scripts/move-apple-intelligence-agency.sh
```

### Issue: Source directory not found
**Error message:** `❌ Source directory not found`

**Solution:** Verify path exists
```bash
ls -la /Users/pennyplatt/Documents/9BitStudios/Oksana/apple-intelligence-agency
```

### Issue: Destination already exists
**Prompt:** `⚠️  Destination already exists: ... Overwrite? [y/N]:`

**Options:**
- Type `y` to overwrite (removes existing, copies fresh)
- Type `n` to cancel and review manually

### Issue: Permission denied
```bash
# Run with current user (avoid sudo)
cd /Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system
./tools/scripts/move-apple-intelligence-agency.sh
```

---

## 📚 Additional Resources

**Migration Details:**
- `MIGRATION_EXECUTION_SUMMARY.md` - Complete migration overview

**Integration Guide:**
- `apple-intelligence-agency/INTEGRATION.md` - Post-migration documentation (created by script)

**Agent System:**
- `apple-intelligence-agency/quantum-leap-suite/CLAUDE.md` - Multi-agent architecture

**Skills:**
- Each skill directory contains `SKILL.md` with detailed instructions

---

## 🎉 Next Steps (After Migration)

### 1. Explore Skills
```bash
cd apple-intelligence-agency/quantum-leap-suite

# View available skills
npx tsx agent-skill-registry.ts list

# Get info on specific skill
npx tsx agent-skill-registry.ts info svg-generation
```

### 2. Review Agent Configuration
```bash
cat config/agent-registry.json
cat CLAUDE.md
```

### 3. Test Vision Pro UI Kit
```bash
cd vision-pro-ui-kit
ls -la
# View Vision Pro assets
open Vision.heic
```

### 4. Integrate with Design System
- Connect skills to `../tokens/source/brand/`
- Output components to `../components/`
- Copy Vision Pro assets to `../m4-acceleration/vision-pro/`

### 5. Optional: Create Pseudo-Skills
- Implement TypeScript pseudo-skills (no SDK required)
- Fast local execution
- No API costs

---

## 📊 Timeline

**Execution:** < 1 minute
**Verification:** 2-3 minutes
**Testing:** 2-5 minutes
**Total:** 5-10 minutes

---

## 🔐 Safety Features

✅ **Non-Destructive:** Original directory preserved
✅ **Interactive:** Prompts for confirmation
✅ **Verified:** Checks structure after migration
✅ **Logged:** Detailed output with color codes
✅ **Backed Up:** README backup created automatically

---

**Ready to execute! Start with command #1 above.** 🚀

---

© 2025 9Bit Studios
**Status:** READY FOR MIGRATION
