import { Player } from "./entities/player";
import { Weapon } from "./weapon";

export class InventoryManager {
  private player: Player;
  private inventory = new Map<mod.InventorySlots, Weapon | mod.Weapons | mod.Gadgets | mod.ArmorTypes | null>();

  constructor(player: Player) {
    this.player = player;
  }

  /** @internal */
  public _updateWeapon(slot: mod.InventorySlots, weapon: Weapon) {
    this.setSlot(slot, weapon);
  }

  private setSlot(slot: mod.InventorySlots, item: Weapon | mod.Weapons | mod.Gadgets | mod.ArmorTypes | null) {
    // If the old item was a weapon, clear its inventory links
    const oldItem = this.inventory.get(slot);
    if (oldItem instanceof Weapon) {
      oldItem._inventoryManager = null;
      oldItem._inventorySlot = null;
    }

    this.inventory.set(slot, item);

    // Always remove the equipment from the slot first to ensure it's clear.
    mod.RemoveEquipment(this.player.native, slot);

    if (item) {
      if (item instanceof Weapon) {
        // Link the new weapon to this inventory
        item._inventoryManager = this;
        item._inventorySlot = slot;

        const weaponPackage = item._buildPackage();
        mod.AddEquipment(this.player.native, item.type, weaponPackage, slot);
      } else {
        mod.AddEquipment(this.player.native, item as any, slot);
      }
    }
  }

  private getSlot(slot: mod.InventorySlots): Weapon | mod.Weapons | mod.Gadgets | mod.ArmorTypes | null {
    return this.inventory.get(slot) ?? null;
  }

  public get primary(): Weapon | mod.Weapons | null { return this.getSlot(mod.InventorySlots.PrimaryWeapon) as any; }
  public set primary(item: Weapon | mod.Weapons | null) { this.setSlot(mod.InventorySlots.PrimaryWeapon, item); }

  public get secondary(): Weapon | mod.Weapons | null { return this.getSlot(mod.InventorySlots.SecondaryWeapon) as any; }
  public set secondary(item: Weapon | mod.Weapons | null) { this.setSlot(mod.InventorySlots.SecondaryWeapon, item); }

  public get gadget1(): mod.Gadgets | null { return this.getSlot(mod.InventorySlots.GadgetOne) as any; }
  public set gadget1(item: mod.Gadgets | null) { this.setSlot(mod.InventorySlots.GadgetOne, item); }

  public get gadget2(): mod.Gadgets | null { return this.getSlot(mod.InventorySlots.GadgetTwo) as any; }
  public set gadget2(item: mod.Gadgets | null) { this.setSlot(mod.InventorySlots.GadgetTwo, item); }

  public get throwable(): mod.Gadgets | null { return this.getSlot(mod.InventorySlots.Throwable) as any; }
  public set throwable(item: mod.Gadgets | null) { this.setSlot(mod.InventorySlots.Throwable, item); }

  public get melee(): mod.Weapons | null { return this.getSlot(mod.InventorySlots.MeleeWeapon) as any; }
  public set melee(item: mod.Weapons | null) { this.setSlot(mod.InventorySlots.MeleeWeapon, item); }

  public get characterGadget(): mod.Gadgets | null { return this.getSlot(mod.InventorySlots.ClassGadget) as any; }
  public set characterGadget(item: mod.Gadgets | null) { this.setSlot(mod.InventorySlots.ClassGadget, item); }

  public get miscGadget(): mod.Gadgets | null { return this.getSlot(mod.InventorySlots.MiscGadget) as any; }
  public set miscGadget(item: mod.Gadgets | null) { this.setSlot(mod.InventorySlots.MiscGadget, item); }

  public get callins(): any | null { return this.getSlot(mod.InventorySlots.Callins) as any; }
  public set callins(item: any | null) { this.setSlot(mod.InventorySlots.Callins, item); }

  public setAmmo(slot: mod.InventorySlots, ammo: number): void {
    mod.SetInventoryAmmo(this.player.native, slot, ammo);
  }

  public setMagazineAmmo(slot: mod.InventorySlots, magAmmo: number): void {
    mod.SetInventoryMagazineAmmo(this.player.native, slot, magAmmo);
  }

  public switchTo(slot: mod.InventorySlots): void {
    mod.ForceSwitchInventory(this.player.native, slot);
  }
}
