package com.ironmantracker;

import net.runelite.client.config.Config;
import net.runelite.client.config.ConfigGroup;
import net.runelite.client.config.ConfigItem;
import net.runelite.client.config.ConfigSection;

@ConfigGroup(IronmanTrackerConfig.GROUP)
public interface IronmanTrackerConfig extends Config
{
	String GROUP = "ironmantracker";

	@ConfigSection(
		name = "Display",
		description = "Controls what is shown in the panel",
		position = 0
	)
	String displaySection = "display";

	@ConfigItem(
		keyName = "showCompleted",
		name = "Show completed steps",
		description = "When enabled, completed steps remain visible (greyed out) in the list",
		section = displaySection,
		position = 0
	)
	default boolean showCompleted()
	{
		return true;
	}

	@ConfigItem(
		keyName = "showLocked",
		name = "Show locked steps",
		description = "When enabled, steps whose requirements are not yet met are visible (dimmed)",
		section = displaySection,
		position = 1
	)
	default boolean showLocked()
	{
		return true;
	}

	@ConfigItem(
		keyName = "highlightCurrent",
		name = "Highlight current step",
		description = "Highlights the first available (actionable) step",
		section = displaySection,
		position = 2
	)
	default boolean highlightCurrent()
	{
		return true;
	}

	// -------------------------------------------------------------------------
	// Persisted skip state – stored as comma-separated step IDs.
	// Managed programmatically via ConfigManager; not shown in the config UI.
	// -------------------------------------------------------------------------

	@ConfigItem(
		keyName = "skippedSteps",
		name = "Skipped steps",
		description = "Comma-separated list of step IDs that have been skipped",
		hidden = true
	)
	default String skippedSteps()
	{
		return "";
	}

	@ConfigItem(
		keyName = "skippedSteps",
		name = "Skipped steps",
		description = "",
		hidden = true
	)
	void setSkippedSteps(String steps);
}
