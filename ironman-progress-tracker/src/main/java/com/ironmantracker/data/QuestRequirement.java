package com.ironmantracker.data;

import lombok.Value;
import net.runelite.api.Client;
import net.runelite.api.Item;
import net.runelite.api.Quest;
import net.runelite.api.QuestState;

/**
 * A requirement based on completing a specific quest.
 */
@Value
public class QuestRequirement implements Requirement
{
	Quest quest;

	@Override
	public boolean isMet(Client client, Item[] bankItems)
	{
		if (client == null)
		{
			return false;
		}
		return quest.getState(client) == QuestState.FINISHED;
	}

	@Override
	public String getDescription()
	{
		return "Quest: " + quest.getName();
	}
}
