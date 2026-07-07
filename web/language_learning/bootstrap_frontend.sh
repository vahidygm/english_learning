#!/usr/bin/env bash

set -Eeuo pipefail

echo "========================================="
echo " English Learning Frontend Bootstrap"
echo "========================================="

# ------------------------------------------------------------
# Check
# ------------------------------------------------------------

if [ ! -f package.json ]; then
    echo "Error: package.json not found."
    echo "Run this script inside your Next.js project."
    exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
    echo "pnpm is required."
    exit 1
fi

# ------------------------------------------------------------
# Install production packages
# ------------------------------------------------------------

echo ""
echo "Installing production packages..."

pnpm add \
@tanstack/react-query \
@tanstack/react-query-devtools \
zustand \
react-hook-form \
zod \
@hookform/resolvers \
axios \
clsx \
tailwind-merge \
class-variance-authority \
lucide-react \
howler \
motion \
sonner \
react-markdown

# ------------------------------------------------------------
# Install dev packages
# ------------------------------------------------------------

echo ""
echo "Installing dev packages..."

pnpm add -D \
prettier \
prettier-plugin-tailwindcss \
eslint-config-prettier \
@types/howler

# ------------------------------------------------------------
# shadcn/ui
# ------------------------------------------------------------

echo ""
echo "Installing shadcn/ui..."

pnpm dlx shadcn@latest init --yes || true

# ------------------------------------------------------------
# Remove demo files
# ------------------------------------------------------------

echo ""
echo "Removing demo files..."

rm -f app/page.tsx
rm -f public/file.svg
rm -f public/globe.svg
rm -f public/next.svg
rm -f public/vercel.svg
rm -f public/window.svg

# ------------------------------------------------------------
# Folder structure
# ------------------------------------------------------------

echo ""
echo "Creating folders..."

mkdir -p \
app/'(auth)'/login \
app/'(auth)'/register \
app/dashboard \
app/lessons/'[lessonId]'/unit/'[unitId]' \
app/review \
app/profile \
app/settings \
app/api \
components/ui \
components/common \
components/layout \
components/providers \
hooks \
lib \
services \
stores \
styles \
types \
modules/auth/{components,hooks,services,types} \
modules/lesson/{components,hooks,services,types} \
modules/unit/{components,hooks,services,types} \
modules/section/{components,hooks,services,types} \
modules/exercise/{components,hooks,services,types} \
modules/dialogue/{components,hooks,services,types} \
modules/vocabulary/{components,hooks,services,types} \
modules/grammar/{components,hooks,services,types} \
modules/pronunciation/{components,hooks,services,types} \
modules/media/{components,hooks,services,types} \
modules/progress/{components,hooks,services,types}

# ------------------------------------------------------------
# App pages
# ------------------------------------------------------------

touch \
app/page.tsx \
app/dashboard/page.tsx \
app/lessons/page.tsx \
app/lessons/'[lessonId]'/page.tsx \
app/lessons/'[lessonId]'/unit/'[unitId]'/page.tsx \
app/review/page.tsx \
app/profile/page.tsx \
app/settings/page.tsx \
app/'(auth)'/login/page.tsx \
app/'(auth)'/register/page.tsx

# ------------------------------------------------------------
# Shared components
# ------------------------------------------------------------

touch \
components/layout/AppLayout.tsx \
components/layout/Header.tsx \
components/layout/Sidebar.tsx \
components/layout/Footer.tsx \
components/common/Loading.tsx \
components/common/Empty.tsx \
components/common/Error.tsx \
components/providers/QueryProvider.tsx \
components/providers/ThemeProvider.tsx

# ------------------------------------------------------------
# Services
# ------------------------------------------------------------

touch \
services/http.ts \
services/api.ts \
services/auth.service.ts \
services/lesson.service.ts \
services/exercise.service.ts

# ------------------------------------------------------------
# Hooks
# ------------------------------------------------------------

touch \
hooks/useAudio.ts \
hooks/useLesson.ts \
hooks/useProgress.ts

# ------------------------------------------------------------
# Stores
# ------------------------------------------------------------

touch \
stores/auth.store.ts \
stores/player.store.ts \
stores/lesson.store.ts \
stores/progress.store.ts

# ------------------------------------------------------------
# Types
# ------------------------------------------------------------

touch \
types/api.ts \
types/common.ts \
types/lesson.ts

# ------------------------------------------------------------
# Lib
# ------------------------------------------------------------

touch \
lib/utils.ts \
lib/constants.ts

# ------------------------------------------------------------
# Module index files
# ------------------------------------------------------------

for module in \
auth \
lesson \
unit \
section \
exercise \
dialogue \
vocabulary \
grammar \
pronunciation \
media \
progress
do
    touch "modules/${module}/index.ts"
done

# ------------------------------------------------------------
# Update tsconfig.json
# ------------------------------------------------------------

echo ""
echo "Updating tsconfig.json..."

python3 <<'PY'
import json

with open("tsconfig.json","r") as f:
    data=json.load(f)

co=data.setdefault("compilerOptions",{})

co["baseUrl"]="."

paths=co.setdefault("paths",{})

paths["@/*"]=["./*"]
paths["@/app/*"]=["app/*"]
paths["@/components/*"]=["components/*"]
paths["@/modules/*"]=["modules/*"]
paths["@/hooks/*"]=["hooks/*"]
paths["@/services/*"]=["services/*"]
paths["@/stores/*"]=["stores/*"]
paths["@/types/*"]=["types/*"]
paths["@/lib/*"]=["lib/*"]

with open("tsconfig.json","w") as f:
    json.dump(data,f,indent=2)
PY

echo ""
echo "========================================="
echo " Bootstrap completed successfully."
echo "========================================="