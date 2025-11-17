#!/bin/bash

# Script pour appliquer les configurations Cursor/Claude à tous les projets
# Usage: ./apply-cursor-config-to-all-projects.sh

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DESKTOP_DIR="$HOME/Desktop"

echo "🚀 Application des configurations Cursor/Claude à tous les projets..."
echo "📁 Source: $SOURCE_DIR"
echo "📁 Desktop: $DESKTOP_DIR"
echo ""

# Fonction pour détecter le type de projet
detect_project_type() {
    local project_dir="$1"
    
    if [ -f "$project_dir/package.json" ]; then
        if grep -q '"next"' "$project_dir/package.json" 2>/dev/null || [ -f "$project_dir/next.config.js" ]; then
            echo "nextjs"
        elif grep -q '"react"' "$project_dir/package.json" 2>/dev/null || [ -f "$project_dir/vite.config.js" ]; then
            echo "react"
        elif grep -q '"vue"' "$project_dir/package.json" 2>/dev/null; then
            echo "vue"
        elif grep -q '"express"' "$project_dir/package.json" 2>/dev/null || [ -f "$project_dir/server.js" ] || [ -f "$project_dir/index.js" ]; then
            echo "nodejs"
        else
            echo "nodejs"
        fi
    elif [ -f "$project_dir/index.html" ] && [ ! -f "$project_dir/package.json" ]; then
        echo "html"
    else
        echo "unknown"
    fi
}

# Fonction pour créer .cursorrules selon le type
create_cursorrules() {
    local project_dir="$1"
    local project_type="$2"
    local project_name=$(basename "$project_dir")
    
    case "$project_type" in
        "nextjs")
            cat > "$project_dir/.cursorrules" << 'NEXTJS_EOF'
# 🤖 CURSOR AI - INSTRUCTIONS PERMANENTES
**Next.js Project**

## 🚀 MODE AUTONOME ABSOLU

### Comportement Fondamental
- ✅ Écris du code complet et production-ready
- ✅ Ne demande JAMAIS de permission pour modifications de code
- ✅ Fixe les erreurs sans attendre
- ✅ Implémente des features ENTIÈRES en un passage
- ✅ Teste tout exhaustivement
- ✅ Ship en 5 minutes MAX

### INTERDICTIONS STRICTES
- ❌ JAMAIS de placeholders ("// TODO", "// Implement this")
- ❌ JAMAIS de questions ("Should I...", "Would you like...")
- ❌ JAMAIS de solutions partielles
- ❌ JAMAIS stopper à la première erreur

## 🎨 STANDARDS DE CODE

### Next.js 14+ App Router
- Server Components par défaut
- Client Components avec 'use client' seulement si nécessaire
- Server Actions pour mutations
- Route Handlers pour API externes
- Metadata API pour SEO

### React
- Composants fonctionnels avec hooks
- TypeScript pour type safety
- Tailwind CSS pour styling
- Error boundaries pour gestion erreurs

### Structure
- Un composant = un fichier
- Props typées avec TypeScript
- Hooks personnalisés pour logique réutilisable

## ⚡ VITESSE > PERFECTION

Ship en 5 minutes max. Version simple qui marche d'abord, puis itérer.

## 📝 OUTPUT FORMAT

✅ Fait!
🔗 [URL]
📝 Ce que j'ai fait: [résumé]
⚠️ Notes: [si problèmes]

PAS DE BLABLA. JUSTE DE L'EXÉCUTION.
NEXTJS_EOF
            ;;
        "react")
            cat > "$project_dir/.cursorrules" << 'REACT_EOF'
# 🤖 CURSOR AI - INSTRUCTIONS PERMANENTES
**React Project**

## 🚀 MODE AUTONOME ABSOLU

### Comportement Fondamental
- ✅ Écris du code complet et production-ready
- ✅ Ne demande JAMAIS de permission pour modifications de code
- ✅ Fixe les erreurs sans attendre
- ✅ Implémente des features ENTIÈRES en un passage
- ✅ Teste tout exhaustivement
- ✅ Ship en 5 minutes MAX

## 🎨 STANDARDS DE CODE

### React
- Composants fonctionnels avec hooks
- TypeScript pour type safety
- Tailwind CSS ou styled-components
- Error boundaries pour gestion erreurs

### Structure
- Un composant = un fichier
- Props typées avec TypeScript
- Hooks personnalisés pour logique réutilisable

## ⚡ VITESSE > PERFECTION

Ship en 5 minutes max. Version simple qui marche d'abord.

## 📝 OUTPUT FORMAT

✅ Fait!
🔗 [URL]
📝 Ce que j'ai fait: [résumé]
REACT_EOF
            ;;
        "nodejs")
            cat > "$project_dir/.cursorrules" << 'NODEJS_EOF'
# 🤖 CURSOR AI - INSTRUCTIONS PERMANENTES
**Node.js/Backend Project**

## 🚀 MODE AUTONOME ABSOLU

### Comportement Fondamental
- ✅ Écris du code complet et production-ready
- ✅ Ne demande JAMAIS de permission pour modifications de code
- ✅ Fixe les erreurs sans attendre
- ✅ Implémente des features ENTIÈRES en un passage
- ✅ Teste tout exhaustivement
- ✅ Ship en 5 minutes MAX

## 🎨 STANDARDS DE CODE

### Node.js/Backend
- Express.js ou FastAPI
- Validation avec Zod/Joi
- Gestion erreurs centralisée
- Logging structuré
- Tests avec Jest/Supertest

### API REST
- Routes RESTful
- Status codes appropriés
- Validation input/output
- Documentation avec Swagger/OpenAPI

## ⚡ VITESSE > PERFECTION

Ship en 5 minutes max. Version simple qui marche d'abord.

## 📝 OUTPUT FORMAT

✅ Fait!
🔗 [URL]
📝 Ce que j'ai fait: [résumé]
NODEJS_EOF
            ;;
        "html")
            cat > "$project_dir/.cursorrules" << 'HTML_EOF'
# 🤖 CURSOR AI - INSTRUCTIONS PERMANENTES
**HTML/CSS/JavaScript Static Site**

## 🚀 MODE AUTONOME ABSOLU

### Comportement Fondamental
- ✅ Écris du code complet et production-ready
- ✅ Ne demande JAMAIS de permission pour modifications de code
- ✅ Fixe les erreurs sans attendre
- ✅ Implémente des features ENTIÈRES en un passage
- ✅ Teste tout exhaustivement
- ✅ Ship en 5 minutes MAX

## 🎨 STANDARDS DE CODE

### HTML
- Balises sémantiques (<header>, <main>, <section>)
- Meta tags SEO complets
- Schema.org structured data
- Accessibilité: alt, aria-label

### CSS
- Variables CSS pour couleurs/espacements
- Mobile-first responsive
- Animations fluides
- Glassmorphism pour éléments modernes

### JavaScript
- ES6+ moderne (arrow functions, const/let)
- Gestion d'erreurs complète
- Validation formulaires
- Performance: lazy loading, debounce

## ⚡ VITESSE > PERFECTION

Ship en 5 minutes max. Version simple qui marche d'abord.

## 📝 OUTPUT FORMAT

✅ Fait!
🔗 [URL]
📝 Ce que j'ai fait: [résumé]
HTML_EOF
            ;;
        *)
            cat > "$project_dir/.cursorrules" << 'DEFAULT_EOF'
# 🤖 CURSOR AI - INSTRUCTIONS PERMANENTES

## 🚀 MODE AUTONOME ABSOLU

### Comportement Fondamental
- ✅ Écris du code complet et production-ready
- ✅ Ne demande JAMAIS de permission pour modifications de code
- ✅ Fixe les erreurs sans attendre
- ✅ Implémente des features ENTIÈRES en un passage
- ✅ Teste tout exhaustivement
- ✅ Ship en 5 minutes MAX

## ⚡ VITESSE > PERFECTION

Ship en 5 minutes max. Version simple qui marche d'abord.

## 📝 OUTPUT FORMAT

✅ Fait!
🔗 [URL]
📝 Ce que j'ai fait: [résumé]
DEFAULT_EOF
            ;;
    esac
}

# Fonction pour copier les fichiers de configuration
copy_config_files() {
    local project_dir="$1"
    local project_type="$2"
    
    # Créer les dossiers
    mkdir -p "$project_dir/.cursor"
    mkdir -p "$project_dir/.claude"
    mkdir -p "$project_dir/.vscode"
    
    # Copier .cursorignore
    if [ -f "$SOURCE_DIR/.cursorignore" ]; then
        cp "$SOURCE_DIR/.cursorignore" "$project_dir/.cursorignore"
        echo "  ✅ .cursorignore copié"
    fi
    
    # Copier .cursor/settings.json (adapté)
    if [ -f "$SOURCE_DIR/.cursor/settings.json" ]; then
        cp "$SOURCE_DIR/.cursor/settings.json" "$project_dir/.cursor/settings.json"
        echo "  ✅ .cursor/settings.json copié"
    fi
    
    # Copier .cursor/preferences.json
    if [ -f "$SOURCE_DIR/.cursor/preferences.json" ]; then
        cp "$SOURCE_DIR/.cursor/preferences.json" "$project_dir/.cursor/preferences.json"
        echo "  ✅ .cursor/preferences.json copié"
    fi
    
    # Copier .cursor/config.json
    if [ -f "$SOURCE_DIR/.cursor/config.json" ]; then
        cp "$SOURCE_DIR/.cursor/config.json" "$project_dir/.cursor/config.json"
        echo "  ✅ .cursor/config.json copié"
    fi
    
    # Créer .cursor/instructions.md (générique)
    cat > "$project_dir/.cursor/instructions.md" << INSTRUCTIONS_EOF
# 🚀 INSTRUCTIONS CURSOR - $(basename "$project_dir")

## 📋 LECTURE OBLIGATOIRE

**Lire en priorité:**
1. \`.cursorrules\` (fichier principal)
2. \`README.md\` (documentation projet)

## ⚡ MODE RAPIDE

Si modification simple (< 5 min):
1. Lire fichier concerné
2. Modifier directement
3. Vérifier pas d'erreurs
4. Commit si nécessaire

## ✅ CHECKLIST AVANT COMMIT

- [ ] Code fonctionne localement
- [ ] Pas d'erreurs console
- [ ] Tests passent (si applicable)
- [ ] Lint OK
INSTRUCTIONS_EOF
    echo "  ✅ .cursor/instructions.md créé"
    
    # Copier .claude/preferences.json
    if [ -f "$SOURCE_DIR/.claude/preferences.json" ]; then
        cp "$SOURCE_DIR/.claude/preferences.json" "$project_dir/.claude/preferences.json"
        echo "  ✅ .claude/preferences.json copié"
    fi
    
    # Créer .claude-code-instructions.md (générique)
    cat > "$project_dir/.claude-code-instructions.md" << CLAUDE_EOF
# CLAUDE CODE PERMANENT INSTRUCTIONS

## CORE BEHAVIOR

- Act as autonomous development agent
- NEVER ask permission, just execute
- Fix errors independently
- Complete entire features in one go
- Ship working URL in < 5 minutes

## PROJECT CONTEXT

Type: $(echo "$project_type" | tr '[:lower:]' '[:upper:]')
Project: $(basename "$project_dir")

## WORKFLOW

1. SCAN PROJECT FIRST
2. Read project context
3. Plan implementation (silent)
4. Execute ALL steps
5. Test thoroughly
6. Fix any issues

## SPEED > PERFECTION

Ship in 5 minutes max. Create SIMPLE version that works, then iterate.

## OUTPUT FORMAT

✅ Done!
🔗 [URL]
📝 What I did: [summary]

NO BLABLA. JUST EXECUTION.
CLAUDE_EOF
    echo "  ✅ .claude-code-instructions.md créé"
    
    # Copier .vscode/settings.json
    if [ -f "$SOURCE_DIR/.vscode/settings.json" ]; then
        cp "$SOURCE_DIR/.vscode/settings.json" "$project_dir/.vscode/settings.json"
        echo "  ✅ .vscode/settings.json copié"
    fi
}

# Parcourir tous les projets sur le Desktop
processed=0
skipped=0
errors=0

for project_dir in "$DESKTOP_DIR"/*/; do
    if [ ! -d "$project_dir" ]; then
        continue
    fi
    
    project_name=$(basename "$project_dir")
    
    # Ignorer certains dossiers
    if [[ "$project_name" == "ARIEL SOLAR PANELS KAVKOM" ]] || \
       [[ "$project_name" == *"Screenshots"* ]] || \
       [[ "$project_name" == *"Documents"* ]] || \
       [[ "$project_name" == *".app"* ]]; then
        continue
    fi
    
    echo "📦 Traitement: $project_name"
    
    # Détecter le type de projet
    project_type=$(detect_project_type "$project_dir")
    echo "  🔍 Type détecté: $project_type"
    
    # Vérifier si déjà configuré
    if [ -f "$project_dir/.cursorrules" ]; then
        echo "  ⚠️  Déjà configuré, skip..."
        skipped=$((skipped + 1))
        echo ""
        continue
    fi
    
    # Créer les configurations
    if create_cursorrules "$project_dir" "$project_type"; then
        echo "  ✅ .cursorrules créé"
        copy_config_files "$project_dir" "$project_type"
        processed=$((processed + 1))
        echo "  ✅ Configuration appliquée!"
    else
        echo "  ❌ Erreur lors de la configuration"
        errors=$((errors + 1))
    fi
    
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Terminé!"
echo "📊 Statistiques:"
echo "   - Projets traités: $processed"
echo "   - Projets ignorés (déjà configurés): $skipped"
echo "   - Erreurs: $errors"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

