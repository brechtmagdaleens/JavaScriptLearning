package com.ironmantracker.data;

import net.runelite.api.Client;
import net.runelite.api.Item;

/**
 * Represents a requirement that can be checked against the current game state.
 */
public interface Requirement
{
	/**
	 * @param client    the RuneLite client
	 * @param bankItems last-known bank contents (may be null if bank was never opened)
	 * @return true if the requirement is currently met
	 */
	boolean isMet(Client client, Item[] bankItems);

	/** Human-readable description shown in the UI. */
	String getDescription();
}
