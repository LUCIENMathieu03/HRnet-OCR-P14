# HRnet - Gestion des employés de WealthHealth

HRnet est une application web interne développée pour WealthHealth, conçue pour gérer efficacement les dossiers des employés. Cette nouvelle version marque une transition complète de l'ancienne architecture jQuery à React, améliorant ainsi la performance, la stabilité et la maintenabilité de l'application.

## 🚀 Objectif

Convertir l'application existante basée sur jQuery en une application React moderne, en remplaçant les anciens plugins tiers (sélecteurs de date, fenêtres modales, menus déroulants et tableaux) par des **composants React natifs** pour résoudre les problèmes de lenteur et de bugs récurrents.

## 🛠️ Fonctionnalités

- **Ajout d’employés** : Permet d’enregistrer les informations des employés avec un flux intuitif.
- **Recherche et filtrage** : Trouvez rapidement les employés grâce à des fonctionnalités de recherche performantes.
- **Gestion des données affichées** : Contrôlez le nombre d’entrées visibles dans le tableau et naviguez facilement à travers les pages.

## 📦 Technologies utilisées

- **React** : Pour le développement de l’interface utilisateur.
- **Vite** : Outil de build performant pour le développement et la production.
- **TypeScript** : Pour un typage sûr et une meilleure maintenabilité.
- **SCSS** : Pour une gestion de styles modulaires et personnalisables.

## 📖 Comment lancer le projet ?

1. **Cloner le dépôt** :

   ```bash
   git clone https://github.com/LUCIENMathieu03/HRnet-OCR-P14.git
   cd HRnet
   ```

2. **Installer les dépendances** :

   ```bash
   npm install
   ```

3. **Lancer l'application en mode développement** :

   ```bash
   npm run dev
   ```

4. **Construire le projet pour la production** :

   ```bash
   npm run build
   ```

5. **Prévisualiser la version de production** :
   ```bash
   npm run preview
   ```

## 🔬 Tests de performance

Des tests ont été réalisés pour comparer la version React à l’ancienne version jQuery. Les résultats montrent des améliorations notables :

- Temps de chargement réduit.
- Fluidité dans la navigation et les interactions.
- Réduction des erreurs liées aux plugins tiers.
