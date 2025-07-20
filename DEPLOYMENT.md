# Guide de Déploiement GitHub Pages

Ce guide vous explique comment déployer votre application Gradient Builder sur GitHub Pages.

## 🚀 Déploiement Rapide

### 1. Prérequis

- Un compte GitHub
- Git installé sur votre machine
- Node.js et npm installés

### 2. Créer un Repository GitHub

1. Allez sur [GitHub](https://github.com) et créez un nouveau repository
2. Nommez-le `gradient-builder` (ou un autre nom de votre choix)
3. Laissez-le public pour GitHub Pages gratuit
4. Ne pas initialiser avec README, .gitignore ou license (on les a déjà)

### 3. Connecter votre Projet Local

```bash
# Si ce n'est pas déjà fait, initialisez git
git init

# Ajoutez tous les fichiers
git add .

# Créez votre premier commit
git commit -m "Initial commit: Gradient Builder app"

# Ajoutez l'origine remote (remplacez YOUR_USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/YOUR_USERNAME/gradient-builder.git

# Poussez vers GitHub
git push -u origin main
```

### 4. Mettre à Jour la Configuration

1. **Modifiez le `package.json`** - Remplacez `yourusername` par votre vrai nom d'utilisateur GitHub :

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/gradient-builder"
}
```

2. **Commitez cette modification** :

```bash
git add package.json
git commit -m "Update homepage URL for GitHub Pages"
git push
```

### 5. Déployer sur GitHub Pages

```bash
# Déployez l'application
npm run deploy
```

Cette commande :

- Construit votre application (`npm run build`)
- Crée une branche `gh-pages`
- Publie le dossier `build` sur cette branche

### 6. Activer GitHub Pages

1. Allez dans les **Settings** de votre repository GitHub
2. Scrollez jusqu'à la section **Pages**
3. Dans **Source**, sélectionnez **"Deploy from a branch"**
4. Choisissez la branche **`gh-pages`**
5. Cliquez sur **Save**

🎉 Votre application sera accessible à : `https://YOUR_USERNAME.github.io/gradient-builder`

## 🔄 Déploiement Automatique avec GitHub Actions

Pour automatiser le déploiement à chaque push, GitHub Actions est déjà configuré dans `.github/workflows/deploy.yml`.

### Activer GitHub Actions

1. Allez dans **Settings** → **Pages**
2. Dans **Source**, choisissez **"GitHub Actions"**
3. Votre application se déploiera automatiquement à chaque push sur `main`

## 📝 Mise à Jour de l'Application

Pour mettre à jour votre application déployée :

### Méthode Manuel

```bash
# Apportez vos modifications
git add .
git commit -m "Description de vos changements"
git push

# Redéployez
npm run deploy
```

### Méthode Automatique (avec GitHub Actions)

```bash
# Simplement poussez vos changements
git add .
git commit -m "Description de vos changements"
git push
```

Le déploiement se fera automatiquement ! 🚀

## 🐛 Dépannage

### Problème : Page blanche ou erreurs 404

- Vérifiez que l'URL `homepage` dans `package.json` est correcte
- Attendez quelques minutes après le déploiement
- Vérifiez que GitHub Pages est activé dans les settings

### Problème : Les chemins des ressources ne fonctionnent pas

- Assurez-vous que `homepage` dans `package.json` correspond exactement à votre URL GitHub Pages

### Problème : Le build échoue

```bash
# Nettoyez et réinstallez les dépendances
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🎨 Personnalisation

Vous pouvez personnaliser :

- Le nom du repository (changez aussi l'URL dans `homepage`)
- Le domaine personnalisé (voir [documentation GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

## 📚 Liens Utiles

- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/#github-pages)
- [gh-pages package](https://www.npmjs.com/package/gh-pages)

## ✅ Checklist de Déploiement

- [ ] Repository GitHub créé
- [ ] Code poussé sur GitHub
- [ ] URL `homepage` mise à jour dans `package.json`
- [ ] `npm run deploy` exécuté avec succès
- [ ] GitHub Pages activé dans les settings
- [ ] Application accessible à l'URL GitHub Pages
- [ ] (Optionnel) GitHub Actions configuré pour le déploiement automatique

---

**Félicitations ! 🎉 Votre Gradient Builder est maintenant live sur GitHub Pages !**
