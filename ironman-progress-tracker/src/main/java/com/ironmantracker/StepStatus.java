package com.ironmantracker;

/**
 * The current state of a guide step as evaluated against the player's game state.
 */
public enum StepStatus
{
	/** All completion requirements are met. */
	COMPLETED,
	/** Not completed but all start requirements are met – player can act on this step now. */
	AVAILABLE,
	/** One or more start requirements are not yet met. */
	LOCKED,
	/** Manually skipped by the player. */
	SKIPPED
}
