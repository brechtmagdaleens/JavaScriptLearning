package com.ironmantracker;

import com.ironmantracker.data.GuideStep;
import com.ironmantracker.data.ItemRequirement;
import com.ironmantracker.data.QuestPointRequirement;
import com.ironmantracker.data.QuestRequirement;
import com.ironmantracker.data.SkillRequirement;
import net.runelite.api.Quest;
import net.runelite.api.Skill;
import java.util.ArrayList;
import java.util.List;

/**
 * Defines all guide steps for the Ironman Progress Tracker.
 * Based on the Oziris efficiency guide and OSRS Wiki Ironman Guide.
 */
public class IronmanGuide
{
    public static List<GuideStep> buildSteps()
    {
        List<GuideStep> steps = new ArrayList<>();

        // ── PHASE 1: Early Game ──────────────────────────────────────────────

        steps.add(GuideStep.builder()
            .id("p1_tutorial")
            .title("Complete Tutorial Island")
            .category("Setup")
            .description("Complete Tutorial Island to begin your Ironman journey. "
                + "Choose Ironman mode from the Account Management interface.")
            .build());

        steps.add(GuideStep.builder()
            .id("p1_buy_house")
            .title("Buy a Player-Owned House")
            .category("Setup")
            .description("Buy a house from the Estate Agent in Varrock for 1,000 gp. "
                + "Owning a house lets you gain Construction XP from repairing Wintertodt braziers, "
                + "which is important right from the start.")
            .build());

        steps.add(GuideStep.builder()
            .id("p1_fm_50")
            .title("Train Firemaking to 50")
            .category("Skill")
            .description("Chop and burn logs: Regular (1) -> Oak (15) -> Willow (30) -> Teak/Willow to 50. "
                + "Use Draynor Village willows for easy access.")
            .completionReq(new SkillRequirement(Skill.FIREMAKING, 50))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_wintertodt")
            .title("Subdue Wintertodt (70+ FM)")
            .category("Boss")
            .description("Grind Wintertodt in Great Kourend for starter cash, seeds, herbs, and supply crates. "
                + "Bring warm clothes (Clue Hunter set is free and scattered around the game). "
                + "Loot scales with your Woodcutting, Herblore, Mining, Farming, and Cooking levels. "
                + "Continue to 99 Firemaking or move on after 70+.")
            .startRequirement(new SkillRequirement(Skill.FIREMAKING, 50))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_druidic_ritual")
            .title("Complete Druidic Ritual")
            .category("Quest")
            .description("Unlocks the Herblore skill entirely. Do this immediately — "
                + "every herb you get from Wintertodt onwards needs this quest done first.")
            .completionReq(new QuestRequirement(Quest.DRUIDIC_RITUAL))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_rune_mysteries")
            .title("Complete Rune Mysteries")
            .category("Quest")
            .description("Unlocks Runecrafting. Required to craft runes for Magic training and passive income via nature rune crafting.")
            .completionReq(new QuestRequirement(Quest.RUNE_MYSTERIES))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_cooks_assistant")
            .title("Complete Cook's Assistant")
            .category("Quest")
            .description("Quick quest with no requirements. Required as a subquest for Recipe for Disaster (Barrows Gloves).")
            .completionReq(new QuestRequirement(Quest.COOKS_ASSISTANT))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_waterfall")
            .title("Complete Waterfall Quest")
            .category("Quest")
            .description("#1 priority early quest. Grants 13,750 Attack XP AND 13,750 Strength XP with zero combat requirements. "
                + "Effectively starts you at ~30 Attack and 30 Strength. "
                + "Bring a rope, glarial's pebble, glarial's amulet (from Baxtorian Falls dungeon), and 6 mithril seeds.")
            .completionReq(new QuestRequirement(Quest.WATERFALL_QUEST))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_vampire_slayer")
            .title("Complete Vampire Slayer")
            .category("Quest")
            .description("Rewards 4,825 Attack XP. Boss can be safespotted. Requires completion of Cook's Assistant.")
            .startRequirement(new QuestRequirement(Quest.COOKS_ASSISTANT))
            .completionReq(new QuestRequirement(Quest.VAMPIRE_SLAYER))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_witchs_house")
            .title("Complete Witch's House")
            .category("Quest")
            .description("Rewards 6,325 Hitpoints XP — one of the best early HP boosts available. Safespot the boss with Magic.")
            .completionReq(new QuestRequirement(Quest.WITCHS_HOUSE))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_fight_arena")
            .title("Complete Fight Arena")
            .category("Quest")
            .description("Rewards 12,175 Attack XP and 2,175 Thieving XP. All bosses can be safespotted with Magic (Iban Blast or Wind Blast).")
            .completionReq(new QuestRequirement(Quest.FIGHT_ARENA))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_tree_gnome_village")
            .title("Complete Tree Gnome Village")
            .category("Quest")
            .description("Rewards 11,450 Attack XP and unlocks Spirit Tree transportation. "
                + "Required prerequisite for The Grand Tree.")
            .completionReq(new QuestRequirement(Quest.TREE_GNOME_VILLAGE))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_grand_tree")
            .title("Complete The Grand Tree")
            .category("Quest")
            .description("Rewards 18,400 Attack XP and unlocks Gnome Gliders for fast travel across the world. "
                + "Requires Tree Gnome Village first.")
            .startRequirement(new QuestRequirement(Quest.TREE_GNOME_VILLAGE))
            .completionReq(new QuestRequirement(Quest.THE_GRAND_TREE))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_priest_in_peril")
            .title("Complete Priest in Peril")
            .category("Quest")
            .description("Unlocks access to Morytania, enabling Barrows runs, Ectofuntus, and the Morytania herb patch. "
                + "Required for Ghosts Ahoy and the Ectophial.")
            .completionReq(new QuestRequirement(Quest.PRIEST_IN_PERIL))
            .build());

        steps.add(GuideStep.builder()
            .id("p1_ghosts_ahoy")
            .title("Complete Ghosts Ahoy")
            .category("Quest")
            .description("Rewards the Ectophial — a free, infinite teleport to the Ectofuntus near Port Phasmatys. "
                + "Essential for efficient Prayer training (4x XP per bone at Ectofuntus) and access to Morytania content.")
            .startRequirement(new QuestRequirement(Quest.PRIEST_IN_PERIL))
            .completionReq(new QuestRequirement(Quest.GHOSTS_AHOY))
            .build());

        // ── PHASE 2: Core Unlocks ────────────────────────────────────────────

        steps.add(GuideStep.builder()
            .id("p2_dragon_slayer")
            .title("Complete Dragon Slayer I")
            .category("Quest")
            .description("Unlocks equipping Rune Platebody — a significant defensive upgrade. "
                + "Requires 32 Quest Points to start. Use safespots and protection prayers against Elvarg.")
            .startRequirement(new QuestPointRequirement(32))
            .completionReq(new QuestRequirement(Quest.DRAGON_SLAYER_I))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_lost_city")
            .title("Complete Lost City")
            .category("Quest")
            .description("Unlocks Zanaris (the Cosmic Nexus). Required to access Dragon Dagger, Dragon equipment, "
                + "and to start the Fairy Ring travel network chain.")
            .completionReq(new QuestRequirement(Quest.LOST_CITY))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_bone_voyage")
            .title("Complete Bone Voyage")
            .category("Quest")
            .description("Unlocks Fossil Island — home of the Birdhouse activity. "
                + "Birdhouse runs every ~50 minutes are the best passive Hunter XP and a vital seed supply.")
            .completionReq(new QuestRequirement(Quest.BONE_VOYAGE))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_birdhouse_runs")
            .title("Set Up Regular Birdhouse Runs")
            .category("Skill")
            .description("After Bone Voyage, build birdhouses and run them every ~50 minutes on Fossil Island. "
                + "This is the most efficient passive Hunter XP in the game and provides a steady stream "
                + "of seeds critical for Farming and Herblore on an Ironman.")
            .startRequirement(new QuestRequirement(Quest.BONE_VOYAGE))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_agility_graceful")
            .title("Train Agility + Collect Graceful Outfit")
            .category("Skill")
            .description("Train Rooftop Agility courses and collect Marks of Grace (260 total for full Graceful set). "
                + "Graceful gives ~30% run energy restore and reduces weight to near zero — huge QoL. "
                + "Route: Gnome (1) -> Draynor (10) -> Al Kharid (20) -> Canifis (40) -> Falador (50) -> Seers' (60+).")
            .completionReq(new SkillRequirement(Skill.AGILITY, 60))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_43_prayer")
            .title("Reach 43 Prayer (Protection Prayers)")
            .category("Skill")
            .description("43 Prayer unlocks all protection prayers — critical for PvM survival. "
                + "Train via Ectofuntus (4x XP per bone with the Ectophial from Ghosts Ahoy) "
                + "or a Gilded Altar in a player-owned house with both burners lit (3.5x XP).")
            .completionReq(new SkillRequirement(Skill.PRAYER, 43))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_thieving_seeds")
            .title("Pickpocket Master Farmers for Seeds")
            .category("Skill")
            .description("At 38 Thieving, pickpocket Master Farmers in Draynor Village or Hosidius. "
                + "This is the primary early source of herb and allotment seeds for Farming and Herblore. "
                + "Stack food from fruit stalls (level 25) to sustain yourself.")
            .startRequirement(new SkillRequirement(Skill.THIEVING, 38))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_fairy_rings")
            .title("Unlock Fairy Ring Travel Network")
            .category("Quest")
            .description("Partially complete Fairytale I – Growing Pains to unlock Fairy Rings. "
                + "Fairy Rings give instant teleportation to ~40 locations across the world — "
                + "essential for efficient herb patch runs and reaching Slayer task areas quickly.")
            .completionReq(new QuestRequirement(Quest.FAIRYTALE_I__GROWING_PAINS))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_animal_magnetism")
            .title("Complete Animal Magnetism")
            .category("Quest")
            .description("Rewards Ava's Accumulator — automatically collects ~80% of fired ammunition. "
                + "Significant savings for Ironmen who must gather every arrow and bolt themselves.")
            .completionReq(new QuestRequirement(Quest.ANIMAL_MAGNETISM))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_horror_from_deep")
            .title("Complete Horror from the Deep")
            .category("Quest")
            .description("Rewards a God Book (choose Armadyl Book of Law for best offensive bonus). "
                + "God books provide prayer and offensive stat bonuses and are a good mid-game offhand.")
            .startRequirement(new SkillRequirement(Skill.AGILITY, 35))
            .completionReq(new QuestRequirement(Quest.HORROR_FROM_THE_DEEP))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_fremennik_trials")
            .title("Complete The Fremennik Trials")
            .category("Quest")
            .description("Unlocks Fremennik Province and access to Waterbirth Island (Dagannoth Kings). "
                + "Required prerequisite for The Fremennik Isles and Helm of Neitiznot.")
            .completionReq(new QuestRequirement(Quest.THE_FREMENNIK_TRIALS))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_fremennik_isles")
            .title("Complete The Fremennik Isles")
            .category("Quest")
            .description("Rewards the Helm of Neitiznot — best-in-slot helmet for the majority of mid-game content. "
                + "+3 Prayer and good defensive stats. Requires The Fremennik Trials.")
            .startRequirement(new QuestRequirement(Quest.THE_FREMENNIK_TRIALS))
            .completionReq(new QuestRequirement(Quest.THE_FREMENNIK_ISLES))
            .build());

        steps.add(GuideStep.builder()
            .id("p2_miscellania")
            .title("Set Up Kingdom of Miscellania")
            .category("Achievement")
            .description("Complete Throne of Miscellania and Royal Trouble quests, then maintain the Kingdom. "
                + "Assign workers to Herbs and Maples. Keep approval at 100% and coffers at 750k-1.5m. "
                + "This provides a completely passive supply of herbs, seeds, and logs that compounds over time.")
            .startRequirement(new QuestRequirement(Quest.THRONE_OF_MISCELLANIA))
            .completionReq(new QuestRequirement(Quest.ROYAL_TROUBLE))
            .build());

        // ── PHASE 3: Mid-Game Quests ─────────────────────────────────────────

        steps.add(GuideStep.builder()
            .id("p3_monkey_madness")
            .title("Complete Monkey Madness I")
            .category("Quest")
            .description("Unlocks the Dragon Scimitar — best melee weapon until 85 Slayer. "
                + "Also grants 35,000 Attack XP and 35,000 Strength XP upon completion. "
                + "Requires The Grand Tree to start.")
            .startRequirement(new QuestRequirement(Quest.THE_GRAND_TREE))
            .completionReq(new QuestRequirement(Quest.MONKEY_MADNESS_I))
            .build());

        steps.add(GuideStep.builder()
            .id("p3_dragon_scimitar")
            .title("Obtain Dragon Scimitar")
            .category("Gear")
            .description("Buy from Gabooty's shop on Ape Atoll (after Monkey Madness I). "
                + "Best melee weapon from 60 Attack until you get an Abyssal Whip at 85 Slayer. "
                + "Use on the Slash attack style.")
            .startRequirement(new QuestRequirement(Quest.MONKEY_MADNESS_I))
            .startRequirement(new SkillRequirement(Skill.ATTACK, 60))
            .completionReq(new ItemRequirement(4587, "Dragon scimitar"))
            .build());

        steps.add(GuideStep.builder()
            .id("p3_underground_pass")
            .title("Complete Underground Pass")
            .category("Quest")
            .description("Required for the Elf quest chain toward Song of the Elves. "
                + "Rewards Iban's Staff — a powerful early magic weapon (50 Magic, 2,500 charges, upgradeable to 2,500,000).")
            .completionReq(new QuestRequirement(Quest.UNDERGROUND_PASS))
            .build());

        steps.add(GuideStep.builder()
            .id("p3_lunar_diplomacy")
            .title("Complete Lunar Diplomacy")
            .category("Quest")
            .description("Unlocks the Lunar Spellbook. Key spells for Ironmen: "
                + "NPC Contact (check Slayer assignments without visiting master), "
                + "Fertile Soil (supercompost patches via spell), "
                + "and Humidify (fill waterskins/buckets). Required for Dream Mentor.")
            .completionReq(new QuestRequirement(Quest.LUNAR_DIPLOMACY))
            .build());

        steps.add(GuideStep.builder()
            .id("p3_dream_mentor")
            .title("Complete Dream Mentor")
            .category("Quest")
            .description("Unlocks additional Lunar spells including Vengeance and Spellbook Swap. "
                + "Requires Lunar Diplomacy and Cyrisus combat encounter (all styles needed).")
            .startRequirement(new QuestRequirement(Quest.LUNAR_DIPLOMACY))
            .completionReq(new QuestRequirement(Quest.DREAM_MENTOR))
            .build());

        steps.add(GuideStep.builder()
            .id("p3_desert_treasure")
            .title("Complete Desert Treasure I")
            .category("Quest")
            .description("Unlocks Ancient Magicks — Ice Burst/Barrage for AoE Slayer (Skeletal Wyverns, Nechryaels, etc.) "
                + "and Smoke Barrage for stacking damage. A transformative unlock for Slayer efficiency.")
            .startRequirement(new QuestRequirement(Quest.PRIEST_IN_PERIL))
            .startRequirement(new SkillRequirement(Skill.MAGIC, 50))
            .startRequirement(new SkillRequirement(Skill.THIEVING, 53))
            .startRequirement(new SkillRequirement(Skill.SLAYER, 10))
            .completionReq(new QuestRequirement(Quest.DESERT_TREASURE_I))
            .build());

        steps.add(GuideStep.builder()
            .id("p3_99_thieving")
            .title("Blackjack to 99 Thieving")
            .category("Skill")
            .description("Blackjack Bandit and Bearded Pollnivnian Bandits in Pollnivneach for the fastest Thieving XP to 99. "
                + "Buy wines from the local bar for food. At 99, you unlock Elf Thieving in Prifddinas. "
                + "Highly recommended to do this before mid-game grinds — massive passive GP.")
            .startRequirement(new SkillRequirement(Skill.THIEVING, 45))
            .completionReq(new SkillRequirement(Skill.THIEVING, 99))
            .build());

        steps.add(GuideStep.builder()
            .id("p3_70_prayer")
            .title("Reach 70 Prayer (Piety)")
            .category("Skill")
            .description("70 Prayer unlocks Piety (+25% Strength, +23% Attack, +25% Defence) — a massive melee DPS boost. "
                + "Train at Chaos Altar in Wilderness level 38 (3.5x XP, risk of PK) or Gilded Altar. "
                + "Source bones from green/blue dragons or Slayer tasks.")
            .completionReq(new SkillRequirement(Skill.PRAYER, 70))
            .build());

        steps.add(GuideStep.builder()
            .id("p3_fighter_torso")
            .title("Obtain Fighter Torso")
            .category("Gear")
            .description("Earned from the Barbarian Assault minigame (approximately 3-5 hours). "
                + "Gives +4 Strength bonus — best-in-slot chest for melee DPS until Bandos Chestplate from GWD. "
                + "No other requirements; can be done at any combat level.")
            .completionReq(new ItemRequirement(10551, "Fighter torso"))
            .build());

        // ── PHASE 4: Slayer & Core Gear ─────────────────────────────────────

        steps.add(GuideStep.builder()
            .id("p4_start_slayer")
            .title("Start Slayer Training")
            .category("Skill")
            .description("Begin Slayer training with Nieve (85+ combat) or Duradel (100+ combat). "
                + "Do 9 tasks at Turael then 1 at Konar/Duradel for bonus points ('point boosting'). "
                + "Priority unlocks: Bigger and Badder (50pts), Slayer Ring (300pts), Slayer Helmet (400pts). "
                + "Block: Kalphites, Suqahs, Metal Dragons, Wyrms.")
            .startRequirement(new SkillRequirement(Skill.COMBAT, 85))
            .build());

        steps.add(GuideStep.builder()
            .id("p4_slayer_helm")
            .title("Build Slayer Helmet")
            .category("Achievement")
            .description("Get Black Mask from Cave Horrors (55 Slayer, Morytania candle required). "
                + "Combine with: Facemask, Earmuffs, Nose Peg, Spiny Helmet, Enchanted Gem. Costs 400 Slayer reward points. "
                + "Imbue with 1.25m NMZ points for +16.67% damage and accuracy vs Slayer targets in all styles.")
            .startRequirement(new SkillRequirement(Skill.SLAYER, 55))
            .completionReq(new ItemRequirement(11864, "Slayer helmet"))
            .build());

        steps.add(GuideStep.builder()
            .id("p4_fire_cape")
            .title("Obtain Fire Cape (Fight Caves)")
            .category("Boss")
            .description("Complete the Fight Caves at TzHaar-Ket-Rak's Challenges (or classic entry). "
                + "Required to imbue the Slayer Helmet and for Karamja Elite Diary. "
                + "Prayer-flick Jad and memorise spawn locations. Recommended: 70+ Ranged, prayer pots, diamond bolts (e).")
            .startRequirement(new SkillRequirement(Skill.RANGED, 70))
            .completionReq(new ItemRequirement(6570, "Fire cape"))
            .build());

        steps.add(GuideStep.builder()
            .id("p4_barrows_runs")
            .title("Farm Barrows for Equipment")
            .category("Boss")
            .description("Run Barrows for Dharok's, Karil's, Ahrim's, Torag's, Guthan's, and Verac's sets. "
                + "Use Wind Wave on all brothers except Ahrim (use Ranged vs him). "
                + "Each chest rewards runes — an important ongoing supply for Ironmen. "
                + "Ectophial provides fast teleport to nearby Barrows site.")
            .startRequirement(new SkillRequirement(Skill.MAGIC, 50))
            .build());

        steps.add(GuideStep.builder()
            .id("p4_helm_neitiznot")
            .title("Obtain Helm of Neitiznot")
            .category("Gear")
            .description("Reward from The Fremennik Isles quest. Best-in-slot helmet for most of mid-game: "
                + "+3 Prayer bonus and strong defensive stats. Free to obtain, just complete the quest.")
            .startRequirement(new QuestRequirement(Quest.THE_FREMENNIK_ISLES))
            .completionReq(new ItemRequirement(10828, "Helm of Neitiznot"))
            .build());

        steps.add(GuideStep.builder()
            .id("p4_avas_accumulator")
            .title("Obtain Ava's Accumulator")
            .category("Gear")
            .description("Reward from Animal Magnetism quest. Automatically picks up ~80% of fired ammo. "
                + "Upgrade to Ava's Assembler at 50 Vorkath KC (Vorkath's Head + Assembler) for BiS Ranged cape.")
            .startRequirement(new QuestRequirement(Quest.ANIMAL_MAGNETISM))
            .completionReq(new ItemRequirement(10499, "Ava's accumulator"))
            .build());

        steps.add(GuideStep.builder()
            .id("p4_barrows_gloves")
            .title("Obtain Barrows Gloves (Recipe for Disaster)")
            .category("Quest")
            .description("Complete all Recipe for Disaster subquests to unlock Barrows Gloves — "
                + "best-in-slot gloves for almost the entire game (+12 all attack, +12 all defence, +6 Strength, +6 Prayer). "
                + "Requires many quest completions including Hero's Quest chain, Legends' Quest, and Family Crest. "
                + "The defining mid-game milestone for Ironmen.")
            .startRequirement(new QuestPointRequirement(107))
            .completionReq(new ItemRequirement(7462, "Barrows gloves"))
            .build());

        steps.add(GuideStep.builder()
            .id("p4_abyssal_whip")
            .title("Obtain Abyssal Whip")
            .category("Gear")
            .description("Drops from Abyssal Demons (85 Slayer). "
                + "Best mid-game melee weapon — use on Controlled style to train Attack, Strength, and Defence simultaneously. "
                + "Add Kraken Tentacle (87 Slayer) to make Abyssal Tentacle for a damage upgrade (degrades).")
            .startRequirement(new SkillRequirement(Skill.SLAYER, 85))
            .completionReq(new ItemRequirement(4151, "Abyssal whip"))
            .build());

        steps.add(GuideStep.builder()
            .id("p4_dragon_boots")
            .title("Obtain Dragon Boots")
            .category("Gear")
            .description("Drops from Spiritual Mages in the God Wars Dungeon (83 Slayer required). "
                + "Best boots available until Primordial Boots from Cerberus (91 Slayer). "
                + "Assign Spiritual Creatures as Slayer task for safe access to GWD.")
            .startRequirement(new SkillRequirement(Skill.SLAYER, 83))
            .completionReq(new ItemRequirement(11840, "Dragon boots"))
            .build());

        steps.add(GuideStep.builder()
            .id("p4_trident")
            .title("Obtain Trident of the Seas")
            .category("Gear")
            .description("Drops from Cave Krakens (87 Slayer). Best mid-game magic weapon — auto-charges using Chaos runes, "
                + "Death runes, Fire runes, and Zulrah's Scales. Scales with Magic level. "
                + "Upgrade to Trident of the Swamp by adding Magic Fang from Zulrah (+3 max hit).")
            .startRequirement(new SkillRequirement(Skill.SLAYER, 87))
            .completionReq(new ItemRequirement(11905, "Trident of the seas (full)"))
            .build());

        steps.add(GuideStep.builder()
            .id("p4_occult_necklace")
            .title("Obtain Occult Necklace")
            .category("Gear")
            .description("Drops from Smoke Devils (87 Slayer). Gives +10% Magic damage bonus — "
                + "the single largest magic upgrade available and mandatory for all magic bossing. "
                + "Combine with Trident of the Swamp and Ahrim's/Ancestral for top magic DPS.")
            .startRequirement(new SkillRequirement(Skill.SLAYER, 87))
            .completionReq(new ItemRequirement(12002, "Occult necklace"))
            .build());

        steps.add(GuideStep.builder()
            .id("p4_berserker_ring")
            .title("Obtain Berserker Ring")
            .category("Gear")
            .description("Drops from Dagannoth Rex at Waterbirth Island. "
                + "Imbue at Nightmare Zone (650,000 points) for +8 Strength bonus — "
                + "best-in-slot melee ring until Ultor Ring (Desert Treasure II).")
            .startRequirement(new SkillRequirement(Skill.SLAYER, 70))
            .completionReq(new ItemRequirement(6737, "Berserker ring"))
            .build());

        // ── PHASE 5: Late Game ───────────────────────────────────────────────

        steps.add(GuideStep.builder()
            .id("p5_monkey_madness_2")
            .title("Complete Monkey Madness II")
            .category("Quest")
            .description("Unlocks Heavy Ballista and access to Ape Atoll tunnels for chinning. "
                + "Demonic Gorillas (post-MM2) drop Zenyte Shards for BiS jewelry and Ballista components. "
                + "Requires 69 Slayer and several other quests.")
            .startRequirement(new QuestRequirement(Quest.MONKEY_MADNESS_I))
            .startRequirement(new SkillRequirement(Skill.SLAYER, 69))
            .completionReq(new QuestRequirement(Quest.MONKEY_MADNESS_II))
            .build());

        steps.add(GuideStep.builder()
            .id("p5_chin_ranged")
            .title("Chin Ranged to 90+ in MM2 Tunnels")
            .category("Skill")
            .description("Use Red Chinchompas in the Ape Atoll tunnels (post-MM2) — hits up to 9 targets simultaneously. "
                + "Extremely fast Ranged XP (300k-500k+ XP/hr). "
                + "Collect Red Chinchompas at Feldip Hills (63+ Hunter) or buy Grey Chins from Woodland Store.")
            .startRequirement(new QuestRequirement(Quest.MONKEY_MADNESS_II))
            .startRequirement(new SkillRequirement(Skill.RANGED, 70))
            .completionReq(new SkillRequirement(Skill.RANGED, 90))
            .build());

        steps.add(GuideStep.builder()
            .id("p5_regicide")
            .title("Complete Regicide")
            .category("Quest")
            .description("Required for the Elf quest chain leading to Song of the Elves and Prifddinas. "
                + "Requires Underground Pass completion and 56 Agility.")
            .startRequirement(new QuestRequirement(Quest.UNDERGROUND_PASS))
            .startRequirement(new SkillRequirement(Skill.AGILITY, 56))
            .completionReq(new QuestRequirement(Quest.REGICIDE))
            .build());

        steps.add(GuideStep.builder()
            .id("p5_making_history")
            .title("Complete Making History")
            .category("Quest")
            .description("Short quest required as a prerequisite for Song of the Elves. "
                + "Also required for the Ardougne Cloak 2+ for medium diary rewards.")
            .completionReq(new QuestRequirement(Quest.MAKING_HISTORY))
            .build());

        steps.add(GuideStep.builder()
            .id("p5_mournings_end_1")
            .title("Complete Mourning's End Part I")
            .category("Quest")
            .description("Part of the Elf quest chain. Requires Regicide and 60 Ranged.")
            .startRequirement(new QuestRequirement(Quest.REGICIDE))
            .startRequirement(new SkillRequirement(Skill.RANGED, 60))
            .completionReq(new QuestRequirement(Quest.MOURNING_S_END_PART_I))
            .build());

        steps.add(GuideStep.builder()
            .id("p5_mournings_end_2")
            .title("Complete Mourning's End Part II")
            .category("Quest")
            .description("Continuation of the Elf quest chain. Features a complex multi-coloured light puzzle. "
                + "Use the OSRS Wiki guide for the puzzle — it is notoriously difficult without a map.")
            .startRequirement(new QuestRequirement(Quest.MOURNING_S_END_PART_I))
            .completionReq(new QuestRequirement(Quest.MOURNING_S_END_PART_II))
            .build());

        steps.add(GuideStep.builder()
            .id("p5_dragon_slayer_2")
            .title("Complete Dragon Slayer II")
            .category("Quest")
            .description("Unlocks Vorkath — the best consistent GP/hour boss for Ironmen. "
                + "Requires Mourning's End Part II, 200 Quest Points, and 60+ in several skills. "
                + "Vorkath drops Dragon Bones, Dragonhide, Rune items, and the coveted Vorkath's Head.")
            .startRequirement(new QuestRequirement(Quest.MOURNING_S_END_PART_II))
            .startRequirement(new SkillRequirement(Skill.AGILITY, 60))
            .startRequirement(new QuestPointRequirement(200))
            .completionReq(new QuestRequirement(Quest.DRAGON_SLAYER_II))
            .build());

        steps.add(GuideStep.builder()
            .id("p5_vorkath")
            .title("Farm Vorkath Regularly")
            .category("Boss")
            .description("Best consistent loot boss for Ironmen: Dragon Bones (Prayer), Blue Dragonhide (Crafting), "
                + "Rune items (Smithing/Alching), and Vorkath's Head at 50 KC for Ava's Assembler (BiS Ranged cape). "
                + "Use Dragon Hunter Crossbow + Ruby Bolts (e) -> Diamond Bolts (e) swap below 60% HP.")
            .startRequirement(new QuestRequirement(Quest.DRAGON_SLAYER_II))
            .build());

        steps.add(GuideStep.builder()
            .id("p5_blowpipe")
            .title("Obtain Toxic Blowpipe from Zulrah")
            .category("Gear")
            .description("Drops from Zulrah (after Dragon Slayer II). Use Dragon Darts for highest DPS. "
                + "Best mid-game Ranged weapon for non-dragon content. "
                + "Also obtain Magic Fang (Trident of the Swamp upgrade) and Onyx (Amulet of Fury) from Zulrah.")
            .startRequirement(new QuestRequirement(Quest.DRAGON_SLAYER_II))
            .startRequirement(new SkillRequirement(Skill.RANGED, 75))
            .completionReq(new ItemRequirement(12924, "Toxic blowpipe"))
            .build());

        steps.add(GuideStep.builder()
            .id("p5_song_of_the_elves")
            .title("Complete Song of the Elves")
            .category("Quest")
            .description("The defining late-game milestone. Unlocks Prifddinas — the best skilling city in the game. "
                + "Also unlocks: The Gauntlet / Corrupted Gauntlet (Bow of Faerdhinen source), "
                + "Elf Thieving at 99 (best thieving XP), Crystal Trees (best Woodcutting), Zalcano. "
                + "Requires 70 in: Agility, Construction, Farming, Herblore, Hunter, Mining, Smithing, Woodcutting.")
            .startRequirement(new QuestRequirement(Quest.MOURNING_S_END_PART_II))
            .startRequirement(new QuestRequirement(Quest.MAKING_HISTORY))
            .startRequirement(new SkillRequirement(Skill.AGILITY, 70))
            .startRequirement(new SkillRequirement(Skill.CONSTRUCTION, 70))
            .startRequirement(new SkillRequirement(Skill.FARMING, 70))
            .startRequirement(new SkillRequirement(Skill.HERBLORE, 70))
            .startRequirement(new SkillRequirement(Skill.HUNTER, 70))
            .startRequirement(new SkillRequirement(Skill.MINING, 70))
            .startRequirement(new SkillRequirement(Skill.SMITHING, 70))
            .startRequirement(new SkillRequirement(Skill.WOODCUTTING, 70))
            .completionReq(new QuestRequirement(Quest.SONG_OF_THE_ELVES))
            .build());

        // ── PHASE 6: Endgame ─────────────────────────────────────────────────

        steps.add(GuideStep.builder()
            .id("p6_corrupted_gauntlet")
            .title("Complete Corrupted Gauntlet")
            .category("Boss")
            .description("Drops the Bow of Faerdhinen and Crystal Armor — BiS Ranged setup until Masori from ToA. "
                + "Crystal Armor gives a 15% Ranged bonus when paired with the Bowfa. "
                + "Complete the regular Gauntlet first to learn the mechanics. Steep learning curve.")
            .startRequirement(new QuestRequirement(Quest.SONG_OF_THE_ELVES))
            .build());

        steps.add(GuideStep.builder()
            .id("p6_91_slayer_cerberus")
            .title("Reach 91 Slayer — Farm Cerberus")
            .category("Boss")
            .description("Cerberus (91 Slayer) drops Primordial Crystal (melee boots), Pegasian Crystal (ranged boots), "
                + "and Eternal Crystal (magic boots). Must be on a Hellhound or Cerberus Slayer assignment. "
                + "Primordial Boots = BiS melee. Pegasian = BiS ranged. Eternal = BiS magic.")
            .startRequirement(new SkillRequirement(Skill.SLAYER, 91))
            .build());

        steps.add(GuideStep.builder()
            .id("p6_95_slayer_hydra")
            .title("Reach 95 Slayer — Farm Alchemical Hydra")
            .category("Boss")
            .description("Alchemical Hydra (95 Slayer, assigned by Konar only). Key drops: "
                + "Hydra Claw + Zamorakian Hasta = Dragon Hunter Lance (BiS melee vs dragons), "
                + "Hydra Leather + Barrows Gloves = Ferocious Gloves (BiS melee gloves). "
                + "Also drops Brimstone Ring pieces and good Herblore supplies.")
            .startRequirement(new SkillRequirement(Skill.SLAYER, 95))
            .build());

        steps.add(GuideStep.builder()
            .id("p6_chambers_of_xeric")
            .title("Farm Chambers of Xeric (CoX)")
            .category("Boss")
            .description("Most sought-after drops: Twisted Bow (BiS vs high-Magic monsters), "
                + "Kodai Wand (BiS magic offhand), Ancestral Robes (BiS magic armour), "
                + "Dragon Hunter Crossbow (BiS vs dragon-type), and Twisted Buckler. "
                + "Recommended: 80+ all combat stats, Ancestral or Armadyl gear.")
            .startRequirement(new SkillRequirement(Skill.COMBAT, 100))
            .build());

        steps.add(GuideStep.builder()
            .id("p6_theatre_of_blood")
            .title("Farm Theatre of Blood (ToB)")
            .category("Boss")
            .description("Group PvM content. Key drops: Avernic Defender (BiS melee offhand), "
                + "Sanguinesti Staff (powerful auto-healing magic staff), Scythe of Vitur (BiS melee for multi), "
                + "and Justiciar Armour. Recommended: 90+ all combat, best-in-slot gear.")
            .startRequirement(new SkillRequirement(Skill.COMBAT, 115))
            .build());

        steps.add(GuideStep.builder()
            .id("p6_tombs_of_amascut")
            .title("Farm Tombs of Amascut (ToA)")
            .category("Boss")
            .description("Solo-friendly raid. Key drops: Tumeken's Shadow (BiS magic weapon — multiplies accuracy/damage), "
                + "Masori Armour (BiS Ranged armour), Osmumten's Fang (BiS accurate stab weapon), "
                + "and Elidinis' Ward. Scale raid difficulty via Invocation system.")
            .startRequirement(new SkillRequirement(Skill.COMBAT, 100))
            .build());

        return steps;
    }
}
