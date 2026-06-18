package com.ironmantracker;

import com.google.inject.Provides;
import com.ironmantracker.data.GuideStep;
import lombok.extern.slf4j.Slf4j;
import net.runelite.api.Client;
import net.runelite.api.InventoryID;
import net.runelite.api.Item;
import net.runelite.api.events.ItemContainerChanged;
import net.runelite.api.events.StatChanged;
import net.runelite.api.events.VarbitChanged;
import net.runelite.client.config.ConfigManager;
import net.runelite.client.eventbus.Subscribe;
import net.runelite.client.plugins.Plugin;
import net.runelite.client.plugins.PluginDescriptor;
import net.runelite.client.ui.ClientToolbar;
import net.runelite.client.ui.NavigationButton;
import net.runelite.client.util.ImageUtil;

import javax.inject.Inject;
import javax.swing.SwingUtilities;
import java.awt.image.BufferedImage;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@PluginDescriptor(
	name = "Ironman Progress Tracker",
	description = "Tracks your Ironman progression and shows what to do next based on popular efficient ironman guides",
	tags = {"ironman", "progress", "guide", "tracker", "efficient"}
)
public class IronmanTrackerPlugin extends Plugin
{
	@Inject
	private Client client;

	@Inject
	private IronmanTrackerConfig config;

	@Inject
	private ConfigManager configManager;

	@Inject
	private ClientToolbar clientToolbar;

	@Inject
	private IronmanTrackerPanel panel;

	private NavigationButton navButton;
	private Item[] cachedBankItems;
	private List<GuideStep> guideSteps;
	private Set<String> skippedSteps;

	@Override
	protected void startUp()
	{
		guideSteps = IronmanGuide.buildSteps();
		skippedSteps = loadSkippedSteps();

		panel.init(guideSteps, this);

		final BufferedImage icon = ImageUtil.loadImageResource(getClass(), "/icon.png");
		navButton = NavigationButton.builder()
			.tooltip("Ironman Progress Tracker")
			.icon(icon)
			.priority(5)
			.panel(panel)
			.build();

		clientToolbar.addNavigation(navButton);
		refreshPanel();
	}

	@Override
	protected void shutDown()
	{
		clientToolbar.removeNavigation(navButton);
		panel.cleanup();
	}

	// -------------------------------------------------------------------------
	// Event subscriptions
	// -------------------------------------------------------------------------

	@Subscribe
	public void onItemContainerChanged(ItemContainerChanged event)
	{
		if (event.getContainerId() == InventoryID.BANK.getId())
		{
			cachedBankItems = event.getItemContainer().getItems();
			refreshPanel();
		}
	}

	@Subscribe
	public void onStatChanged(StatChanged event)
	{
		refreshPanel();
	}

	@Subscribe
	public void onVarbitChanged(VarbitChanged event)
	{
		// Quest completions and diary completions are tracked via varbits
		refreshPanel();
	}

	// -------------------------------------------------------------------------
	// Skip / unskip actions called from the panel
	// -------------------------------------------------------------------------

	public void skipStep(String stepId)
	{
		skippedSteps.add(stepId);
		persistSkippedSteps();
		refreshPanel();
	}

	public void unskipStep(String stepId)
	{
		skippedSteps.remove(stepId);
		persistSkippedSteps();
		refreshPanel();
	}

	public boolean isSkipped(String stepId)
	{
		return skippedSteps.contains(stepId);
	}

	// -------------------------------------------------------------------------
	// Config helpers
	// -------------------------------------------------------------------------

	@Provides
	IronmanTrackerConfig provideConfig(ConfigManager configManager)
	{
		return configManager.getConfig(IronmanTrackerConfig.class);
	}

	private Set<String> loadSkippedSteps()
	{
		String raw = config.skippedSteps();
		Set<String> set = new HashSet<>();
		if (raw != null && !raw.isBlank())
		{
			set.addAll(Arrays.asList(raw.split(",")));
		}
		return set;
	}

	private void persistSkippedSteps()
	{
		configManager.setConfiguration(
			IronmanTrackerConfig.GROUP,
			"skippedSteps",
			String.join(",", skippedSteps)
		);
	}

	// -------------------------------------------------------------------------
	// Panel refresh
	// -------------------------------------------------------------------------

	private void refreshPanel()
	{
		// Update each step's status based on current game state
		for (GuideStep step : guideSteps)
		{
			step.updateStatus(client, cachedBankItems, skippedSteps.contains(step.getId()));
		}

		SwingUtilities.invokeLater(() -> panel.refresh(config));
	}
}
