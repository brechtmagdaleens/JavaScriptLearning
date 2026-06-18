package com.ironmantracker.data;

import lombok.Value;
import net.runelite.api.Client;
import net.runelite.api.InventoryID;
import net.runelite.api.Item;
import net.runelite.api.ItemContainer;

/**
 * A requirement based on owning at least a given quantity of an item.
 * Checks both the cached bank contents and the current inventory/equipment.
 */
@Value
public class ItemRequirement implements Requirement
{
	int itemId;
	int quantity;
	String itemName;

	public ItemRequirement(int itemId, String itemName)
	{
		this(itemId, 1, itemName);
	}

	public ItemRequirement(int itemId, int quantity, String itemName)
	{
		this.itemId = itemId;
		this.quantity = quantity;
		this.itemName = itemName;
	}

	@Override
	public boolean isMet(Client client, Item[] bankItems)
	{
		int count = countIn(bankItems);

		if (client != null)
		{
			count += countIn(containerItems(client, InventoryID.INVENTORY));
			count += countIn(containerItems(client, InventoryID.EQUIPMENT));
		}

		return count >= quantity;
	}

	private int countIn(Item[] items)
	{
		if (items == null)
		{
			return 0;
		}
		int total = 0;
		for (Item item : items)
		{
			if (item != null && item.getId() == itemId)
			{
				total += item.getQuantity();
			}
		}
		return total;
	}

	private Item[] containerItems(Client client, InventoryID id)
	{
		ItemContainer container = client.getItemContainer(id);
		return container == null ? null : container.getItems();
	}

	@Override
	public String getDescription()
	{
		return (quantity > 1 ? quantity + "x " : "") + itemName;
	}
}
