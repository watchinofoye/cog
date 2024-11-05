### 12.331.0
- Correction de l'affichage de la fiche NPC

### 12.330.0
- Mise à jour de la gestion des Profils, Voies et Capacités, iso COF

### 12.328.1
- Correction de la création des compendiums

### 12.328.0
- Compatibilité V12

### 11.315.0
- Dernière version v11 (avec version maximum de Foundry à 11) 

### 11.308.1
FONCTIONNALITES
- Portage de la fonctionnalité COF des StatusEffects : changement de l'ordre, mise en couleur des icônes pris en comptes pour COG, prise en compte des modifications (malus ou d12)

### 11.302.1
CORRECTIFS
- Rendu correct des liens dans les champs de type Editeur de texte

### 11.302.0
FONCTIONNALITES
- Système compatible avec Foundry v11 tout en restant compatible V10

### 10.291.1
FONCTIONNALITES
- Système compatible avec Foundry v10
- Nouvelle option du système pour désactiver le son de certaines actions et changement de l'ordre des options
- Statistique anonyme de la création d'un monde
- Ajout d'une action sur les onglets inventaire et capacités pour envoyer des informations sur l'objet dans la fenêtre de chat
- Ajout des infots de l'onglet combat dans l'onglet inventaire

CORRECTIFS
- Dépenser 1 Point de Récupération rend TOUS les points de vie

### Version 9.269.4
FONCTIONNALITES
- Ajout du clic gauche pour ouvrir directement un trait ou un profil depuis la fiche de personnage

### Version 9.269.3
CORRECTIFS
- Correction de l'affichage de la difficulté dans le chat des joueurs

FONCTIONNALITES
- Ajout du maximum à deux fois l'Init avec l'option Initiative aléatoire

### Version 9.269.2
FONCTIONNALITES
- Ajout de l'option initiative variable
- Ajout de l'option Setting Cyberpunk
- Prise en compte du setting Cyberpunk pour les points de Cash

### Version 9.269.1
CORRECTIFS
- Bonus sur les attaques qui apparait deux fois dans la fenêtre de dialogue

FONCTIONNALITES
- Mise à jour des clé de traduction
- Prise en compte de la difficulté selon la cible et l'option

### Version 9.238.2
CORRECTIFS
- Ouverture des compendiums

### Version 9.238.1
CORRECTIFS
- Drag n drop des macros
- Affichage des tabs

### Version 0.8.9.6
CORRECTIFS
- Affichage du nombre de mains dans l'onglet Combat
- La désélection des propriétés d'un objet entraine la désélection des propriétés liées
- Corrige checkbox DR cachée si option non activée

### Version 0.8.9.5
FONCTIONNALITES
- Dé explosif des DM désactivable par une option
- Ajout d'une option "Vérification des mains libres" : vérifie qu'il reste assez de mains pour équiper l'objet
		Ne pas vérifier
		Vérifié : ignorable par tout le monde en utilisant SHIFT
		Vérifié : ignorable uniquement par le MJ en utilisant SHIFT

- Ajout d'une option "Vérification des emplacements d'armure" : vérifie que le slot n'est pas déjà pris par une armure équipée
		Ne pas vérifier
		Vérifié : ignorable par tout le monde en utilisant SHIFT
		Vérifié : ignorable uniquement par le MJ en utilisant SHIFT
- Ajout du support du module Token Action HUD
	Caractéristiques : 
		Clic gauche : Jet avec dialogue
		Clic droit : Jet sans dialogue
		
		Caractéristiques : Jet de dé
		Attaques : Jet de dé

	Combat
		Clic gauche : Toucher + DM
		Shift + Click : DM
		
		Armes : armes de contact ou à distance équipées
		Sorts : de type armes ou les sorts activables
			Cliquer sur un sort activable ouvre sa fiche
		
	Inventaire
		Clic droit (si option activée): ouvre la fiche de l'objet
		Clic gauche :
			Armes et Protections : Equipe/Déséquipe
			Consommables : affiche les objets consommables sauf les sorts, consomme une unité de l'objet
			Sorts : consomme le sort s'il est "consommable", sinon ne fait rien
			Equipement : les autres objets, ne fait rien
			
	Capacité 
		Clic gauche : ouvre la capacité
- Mise à jour du compendium d'équipement avec le champ Emplacement et Deux mains
### Version 0.8.9.4
CORRECTIFS
* Correction si le profil n'a qu'une voie
* Correction de la valeur de l'incantation
* Correction de la sélection multiple des options du système
* Correction du calcul du Mod des jets d'attaque

FONCTIONNALITES
* Ajout d'un filtre sur l'onglet combat pour n'afficher que les "arme" et "protection
* Synchronisation de l'état des effets avec l'état "Equipé" des items parent
* Ajout de la possibilité d'ignorer la synchronisation des active effect avec leur item "équipable" en utilisant MAJ
### Version 0.8.9.3
CORRECTIFS
* Correction de la gestion du profil : drag and drop, édition, suppression
### Version 0.8.9.2
CORRECTIFS
* Correction du calcul Mod et DM d'une rencontre : calcul depuis l'onglet Combat et non l'objet
* Correction de la gestion des voies et capacités : drag and drop, édition, suppression

FONCTIONNALITES
* Prise en compte du dé explosif pour les DM
* Mise en place du verrou Joueur pour les Items
* Modification de l'actor-sheet et de l'item-sheet pour prise en compte du droit "Limité"
* Masquage des boutons d'actions si la feuille est en lecture seule
* Prise en compte du droit Limité sur les Rencontres
* Remplacement du jet de dé des points de récupération par un healing roll

### Version 0.8.9.1
Mise à jour pour supporter Foundry 0.8 et rattrapage des fonctionnalités déjà offertes par COF.

* Mis en oeuvre des Effets
* Ajout de l'onglet Effets dans les Items et les Actors
* Tous les calculs de la fiche sont maintenant réalisés après la prise en compte des effets
* Shift + Click sur un raccourci d'arme dans la hotbar pour avoir uniquement la fenêtre des dommages
* Changement de l'icône par défaut pour chaque type d'actors et d'items
* Dépense d'un PR en cliquant sur l'icône du Coeur : clic gauche avec gain de PV, clic droit sans
* Séparation de Bonus/Malus en Bonus et Malus dans les fenêtres de dialogue Jet de compétence / Jet d'attaque
* Possibilité d'infliger les dégâts des attaques depuis le chat à des tokens ciblés via des "boutons de dommages"
* Prise en compte de la Résistance aux Dommages
* Option "Affiche les boutons de dommages" : afficher ou non les boutons d'application des dégâts à tout le monde, par défaut uniquement au MJ
* Affiche uniquement les entêtes utiles à la catégorie dans la partie Combat
* Onglet Voies et Capacités : un clic permet de déplier/replier la description d'une capacité
* Possibilité de changer le label, la description du jet de compétences et la description des dommages des fenêtres de jet dans une macro
* Acteur de type Rencontre avec des items Armes de rencontre et Capacités

### Version 0.1.0
* Gestion de l'équipement dans l'onglet Combat
* Prise des bonuses du profil dans la feuille de perso
* Gestion du calcul de Points de Vie spécifiques à COG
* Calcul auto des points de mana et des points de chance/choc
* Gestion du malus d'armure au score d'init
* Prise en compte des jets de dommages qui explosent
* Ajout des derniers items au compendium équipement avec notamment les armes à distance
* Affichage des détails du profil et du trait en cliquant dessus à partir de la FdP
* Ajout d'un système de suivi des blessures graves.
* Correction de bugs d'affichage graphique dans les deux feuilles de style.