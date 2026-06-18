package com.ironmantracker;

import com.ironmantracker.data.GuideStep;
import com.ironmantracker.data.Requirement;
import net.runelite.client.ui.ColorScheme;
import net.runelite.client.ui.FontManager;
import net.runelite.client.ui.PluginPanel;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.util.List;

/**
 * Side panel showing the Ironman progress guide.
 *
 * <p>Layout:
 * <pre>
 *  ┌─────────────────────────────┐
 *  │  Header + progress bar      │
 *  ├─────────────────────────────┤
 *  │  ▶ Current Step (expanded)  │
 *  │    description + reqs       │
 *  │    [Skip]                   │
 *  ├─────────────────────────────┤
 *  │  ✓ Completed step           │
 *  │  🔒 Locked step             │
 *  │  ⊘ Skipped step  [Unskip]  │
 *  └─────────────────────────────┘
 * </pre>
 */
public class IronmanTrackerPanel extends PluginPanel
{
	// Colours matching RuneLite dark theme
	private static final Color COLOR_COMPLETED  = new Color(0, 180, 0);
	private static final Color COLOR_AVAILABLE  = new Color(0, 150, 255);
	private static final Color COLOR_LOCKED     = new Color(120, 120, 120);
	private static final Color COLOR_SKIPPED    = new Color(180, 140, 0);
	private static final Color COLOR_REQ_MET    = new Color(0, 200, 0);
	private static final Color COLOR_REQ_UNMET  = new Color(200, 50, 50);

	private static final Color BG_CURRENT = new Color(30, 50, 80);
	private static final Color BG_ROW_ODD  = ColorScheme.DARKER_GRAY_COLOR;
	private static final Color BG_ROW_EVEN = ColorScheme.DARK_GRAY_COLOR;

	private List<GuideStep> steps;
	private IronmanTrackerPlugin plugin;

	// UI components rebuilt on each refresh
	private final JLabel progressLabel = new JLabel();
	private final JProgressBar progressBar = new JProgressBar();
	private final JPanel stepsContainer = new JPanel();

	public IronmanTrackerPanel()
	{
		super(false); // don't wrap in scroll pane yet – we'll add one ourselves
		setLayout(new BorderLayout());
		setBackground(ColorScheme.DARK_GRAY_COLOR);
	}

	public void init(List<GuideStep> steps, IronmanTrackerPlugin plugin)
	{
		this.steps = steps;
		this.plugin = plugin;
		buildStaticUI();
	}

	private void buildStaticUI()
	{
		removeAll();

		// ── Header ──────────────────────────────────────────────────────────
		JPanel header = new JPanel(new BorderLayout(0, 4));
		header.setBackground(ColorScheme.DARKER_GRAY_COLOR);
		header.setBorder(new EmptyBorder(8, 8, 8, 8));

		JLabel title = new JLabel("Ironman Progress Tracker");
		title.setFont(FontManager.getRunescapeBoldFont());
		title.setForeground(Color.WHITE);

		progressBar.setMinimum(0);
		progressBar.setMaximum(100);
		progressBar.setStringPainted(true);
		progressBar.setForeground(COLOR_COMPLETED);
		progressBar.setBackground(ColorScheme.DARKER_GRAY_COLOR.darker());

		progressLabel.setFont(FontManager.getRunescapeSmallFont());
		progressLabel.setForeground(ColorScheme.LIGHT_GRAY_COLOR);

		header.add(title, BorderLayout.NORTH);
		header.add(progressBar, BorderLayout.CENTER);
		header.add(progressLabel, BorderLayout.SOUTH);

		// ── Step list ────────────────────────────────────────────────────────
		stepsContainer.setLayout(new BoxLayout(stepsContainer, BoxLayout.Y_AXIS));
		stepsContainer.setBackground(ColorScheme.DARK_GRAY_COLOR);

		JScrollPane scroll = new JScrollPane(stepsContainer,
			JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
			JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
		scroll.setBackground(ColorScheme.DARK_GRAY_COLOR);
		scroll.setBorder(BorderFactory.createEmptyBorder());
		scroll.getVerticalScrollBar().setUnitIncrement(16);

		add(header, BorderLayout.NORTH);
		add(scroll, BorderLayout.CENTER);

		revalidate();
		repaint();
	}

	/** Called by the plugin on the EDT after step statuses have been recomputed. */
	public void refresh(IronmanTrackerConfig config)
	{
		if (steps == null)
		{
			return;
		}

		// Update progress bar
		long completed = steps.stream().filter(s -> s.getStatus() == StepStatus.COMPLETED).count();
		long skipped   = steps.stream().filter(s -> s.getStatus() == StepStatus.SKIPPED).count();
		long total     = steps.size();
		int pct = total == 0 ? 0 : (int) (completed * 100 / total);
		progressBar.setValue(pct);
		progressBar.setString(pct + "%");
		progressLabel.setText(completed + " / " + total + " steps done   (" + skipped + " skipped)");

		// Rebuild step rows
		stepsContainer.removeAll();

		boolean isFirstAvailable = true;
		for (int i = 0; i < steps.size(); i++)
		{
			GuideStep step = steps.get(i);
			StepStatus status = step.getStatus();

			if (status == StepStatus.COMPLETED && !config.showCompleted())
			{
				continue;
			}
			if (status == StepStatus.LOCKED && !config.showLocked())
			{
				continue;
			}

			boolean isCurrent = (status == StepStatus.AVAILABLE && isFirstAvailable && config.highlightCurrent());
			if (status == StepStatus.AVAILABLE)
			{
				isFirstAvailable = false;
			}

			stepsContainer.add(buildStepRow(step, i, isCurrent));
		}

		stepsContainer.revalidate();
		stepsContainer.repaint();
	}

	private JPanel buildStepRow(GuideStep step, int index, boolean isCurrent)
	{
		JPanel row = new JPanel();
		row.setLayout(new BorderLayout(4, 4));
		row.setBorder(new EmptyBorder(6, 8, 6, 8));
		row.setBackground(isCurrent ? BG_CURRENT : (index % 2 == 0 ? BG_ROW_EVEN : BG_ROW_ODD));
		row.setMaximumSize(new Dimension(Integer.MAX_VALUE, Integer.MAX_VALUE));

		StepStatus status = step.getStatus();

		// ── Status icon + title ──────────────────────────────────────────────
		JPanel titleRow = new JPanel(new BorderLayout(6, 0));
		titleRow.setOpaque(false);

		JLabel iconLabel = new JLabel(statusIcon(status));
		iconLabel.setForeground(statusColor(status));
		iconLabel.setFont(FontManager.getRunescapeSmallFont());

		JLabel titleLabel = new JLabel(step.getTitle());
		titleLabel.setForeground(status == StepStatus.LOCKED ? COLOR_LOCKED : Color.WHITE);
		titleLabel.setFont(status == StepStatus.COMPLETED
			? FontManager.getRunescapeSmallFont()
			: FontManager.getRunescapeFont());

		JLabel categoryLabel = new JLabel("[" + step.getCategory() + "]");
		categoryLabel.setForeground(ColorScheme.LIGHT_GRAY_COLOR);
		categoryLabel.setFont(FontManager.getRunescapeSmallFont());

		titleRow.add(iconLabel, BorderLayout.WEST);
		titleRow.add(titleLabel, BorderLayout.CENTER);
		titleRow.add(categoryLabel, BorderLayout.EAST);

		row.add(titleRow, BorderLayout.NORTH);

		// ── Expanded detail (current + available steps) ──────────────────────
		if (isCurrent || status == StepStatus.AVAILABLE || status == StepStatus.SKIPPED)
		{
			JPanel detail = new JPanel();
			detail.setLayout(new BoxLayout(detail, BoxLayout.Y_AXIS));
			detail.setOpaque(false);
			detail.setBorder(new EmptyBorder(4, 16, 0, 0));

			// Description
			JTextArea desc = new JTextArea(step.getDescription());
			desc.setOpaque(false);
			desc.setEditable(false);
			desc.setLineWrap(true);
			desc.setWrapStyleWord(true);
			desc.setForeground(ColorScheme.LIGHT_GRAY_COLOR);
			desc.setFont(FontManager.getRunescapeSmallFont());
			desc.setMaximumSize(new Dimension(Integer.MAX_VALUE, Integer.MAX_VALUE));
			detail.add(desc);

			// Requirements
			if (step.getCompletionRequirements() != null && !step.getCompletionRequirements().isEmpty())
			{
				JLabel reqHeader = new JLabel("Requirements to complete:");
				reqHeader.setForeground(Color.WHITE);
				reqHeader.setFont(FontManager.getRunescapeSmallFont());
				reqHeader.setBorder(new EmptyBorder(4, 0, 2, 0));
				detail.add(reqHeader);

				for (Requirement req : step.getCompletionRequirements())
				{
					boolean met = step.getStatus() == StepStatus.COMPLETED;
					// We can't re-evaluate here without client ref, so use status as proxy for completion
					JLabel reqLabel = new JLabel("  • " + req.getDescription());
					reqLabel.setForeground(met ? COLOR_REQ_MET : COLOR_REQ_UNMET);
					reqLabel.setFont(FontManager.getRunescapeSmallFont());
					detail.add(reqLabel);
				}
			}

			// Skip / Unskip button
			JPanel buttonRow = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 4));
			buttonRow.setOpaque(false);

			if (status == StepStatus.SKIPPED)
			{
				JButton unskipBtn = new JButton("Unskip");
				styleButton(unskipBtn, new Color(50, 100, 50));
				unskipBtn.addActionListener(e -> plugin.unskipStep(step.getId()));
				buttonRow.add(unskipBtn);
			}
			else if (status != StepStatus.COMPLETED)
			{
				JButton skipBtn = new JButton("Skip");
				styleButton(skipBtn, new Color(100, 50, 50));
				skipBtn.addActionListener(e -> plugin.skipStep(step.getId()));
				buttonRow.add(skipBtn);
			}

			detail.add(buttonRow);
			row.add(detail, BorderLayout.CENTER);
		}
		else if (status == StepStatus.COMPLETED)
		{
			// Collapsed completed row – show a tiny "Unskip" to allow re-doing
			// Actually completed steps don't need unskip; skip button is only for skipped ones.
			// Just show a compact completed indicator.
		}

		return row;
	}

	private String statusIcon(StepStatus status)
	{
		switch (status)
		{
			case COMPLETED: return "✔";
			case AVAILABLE: return "▶";
			case LOCKED:    return "🔒";
			case SKIPPED:   return "⊘";
			default:        return "?";
		}
	}

	private Color statusColor(StepStatus status)
	{
		switch (status)
		{
			case COMPLETED: return COLOR_COMPLETED;
			case AVAILABLE: return COLOR_AVAILABLE;
			case LOCKED:    return COLOR_LOCKED;
			case SKIPPED:   return COLOR_SKIPPED;
			default:        return Color.WHITE;
		}
	}

	private void styleButton(JButton btn, Color bg)
	{
		btn.setBackground(bg);
		btn.setForeground(Color.WHITE);
		btn.setFont(FontManager.getRunescapeSmallFont());
		btn.setFocusPainted(false);
		btn.setBorder(new EmptyBorder(3, 8, 3, 8));
		btn.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
	}

	public void cleanup()
	{
		removeAll();
	}
}
