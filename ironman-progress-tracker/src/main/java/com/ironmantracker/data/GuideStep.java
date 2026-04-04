package com.ironmantracker.data;

import com.ironmantracker.StepStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Singular;
import net.runelite.api.Client;
import net.runelite.api.Item;

import java.util.Collections;
import java.util.List;

/**
 * Represents a single step in the Ironman progress guide.
 *
 * <p>A step has two kinds of requirements:
 * <ul>
 *   <li>{@code startRequirements} – what the player needs <em>before</em> they can attempt this
 *       step (gates whether the step is {@link StepStatus#AVAILABLE} or {@link StepStatus#LOCKED}).
 *   <li>{@code completionRequirements} – what proves the step is done (gates whether the step
 *       transitions to {@link StepStatus#COMPLETED}).
 * </ul>
 */
@Getter
@Builder
public class GuideStep
{
	/** Stable, unique identifier used to persist skipped-step state. */
	private final String id;

	/** Short title shown in the step list. */
	private final String title;

	/**
	 * Detailed description of what to do, shown when the step is expanded.
	 * May include tips and references to popular guides.
	 */
	private final String description;

	/** Category label (e.g. "Quest", "Skill", "Achievement", "Boss"). */
	private final String category;

	/**
	 * Requirements that must all be met before the player can realistically start this step.
	 * If empty the step is always at least {@link StepStatus#AVAILABLE}.
	 */
	@Singular
	private final List<Requirement> startRequirements;

	/**
	 * Requirements that prove this step is finished.
	 * If empty the step can never be auto-detected as completed (requires manual skip).
	 */
	@Singular("completionReq")
	private final List<Requirement> completionRequirements;

	// -------------------------------------------------------------------------
	// Runtime state (not part of the builder)
	// -------------------------------------------------------------------------

	private StepStatus status = StepStatus.LOCKED;

	/**
	 * Recomputes {@link #status} based on current game state.
	 *
	 * @param client    RuneLite client
	 * @param bankItems last-known bank contents (null if bank never opened)
	 * @param skipped   whether the player has manually skipped this step
	 */
	public void updateStatus(Client client, Item[] bankItems, boolean skipped)
	{
		if (skipped)
		{
			status = StepStatus.SKIPPED;
			return;
		}

		// Step is completed when every completion requirement is met
		List<Requirement> compReqs = completionRequirements == null
			? Collections.emptyList()
			: completionRequirements;

		if (!compReqs.isEmpty() && compReqs.stream().allMatch(r -> r.isMet(client, bankItems)))
		{
			status = StepStatus.COMPLETED;
			return;
		}

		// Step is available when every start requirement is met
		List<Requirement> startReqs = startRequirements == null
			? Collections.emptyList()
			: startRequirements;

		boolean canStart = startReqs.stream().allMatch(r -> r.isMet(client, bankItems));
		status = canStart ? StepStatus.AVAILABLE : StepStatus.LOCKED;
	}
}
