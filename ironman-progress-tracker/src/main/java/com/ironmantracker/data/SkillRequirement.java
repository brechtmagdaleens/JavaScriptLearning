package com.ironmantracker.data;

import lombok.Value;
import net.runelite.api.Client;
import net.runelite.api.Item;
import net.runelite.api.Skill;

/**
 * A requirement based on reaching a minimum skill level.
 */
@Value
public class SkillRequirement implements Requirement
{
	Skill skill;
	int level;

	@Override
	public boolean isMet(Client client, Item[] bankItems)
	{
		if (client == null)
		{
			return false;
		}
		return client.getRealSkillLevel(skill) >= level;
	}

	@Override
	public String getDescription()
	{
		return level + " " + skill.getName();
	}
}
