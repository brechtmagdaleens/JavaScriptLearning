package com.ironmantracker.data;

import lombok.Value;
import net.runelite.api.Client;
import net.runelite.api.Item;
import net.runelite.api.VarPlayer;

/**
 * A requirement based on having a minimum number of quest points.
 */
@Value
public class QuestPointRequirement implements Requirement
{
	int points;

	@Override
	public boolean isMet(Client client, Item[] bankItems)
	{
		if (client == null)
		{
			return false;
		}
		return client.getVar(VarPlayer.QUEST_POINTS) >= points;
	}

	@Override
	public String getDescription()
	{
		return points + " Quest Points";
	}
}
