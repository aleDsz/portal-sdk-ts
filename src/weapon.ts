import { InventoryManager } from "./inventory_manager";

export class Weapon {
  public readonly type: mod.Weapons;
  private attachments: mod.WeaponAttachments[] = [];

  /** @internal */
  public _inventoryManager: InventoryManager | null = null;
  /** @internal */
  public _inventorySlot: mod.InventorySlots | null = null;

  constructor(type: mod.Weapons) {
    this.type = type;
  }

  public addAttachment(attachment: mod.WeaponAttachments): this {
    const getSlot = (att: mod.WeaponAttachments) => (mod.WeaponAttachments[att] as string).split('_')[0];
    const newSlot = getSlot(attachment);

    // Remove any existing attachment in the same slot
    const existingIndex = this.attachments.findIndex(existing => getSlot(existing) === newSlot);

    if (existingIndex > -1) {
      // If the exact same attachment is already there, do nothing.
      if (this.attachments[existingIndex] === attachment) return this

      this.attachments.splice(existingIndex, 1);
    }

    this.attachments.push(attachment);

    // If this weapon is equipped, trigger an update
    if (this._inventoryManager && this._inventorySlot) {
      this._inventoryManager._updateWeapon(this._inventorySlot, this);
    }

    return this;
  }

  public removeAttachment(attachment: mod.WeaponAttachments): this {
    const index = this.attachments.indexOf(attachment);

    if (index > -1) {
      this.attachments.splice(index, 1);

      if (this._inventoryManager && this._inventorySlot) {
        this._inventoryManager._updateWeapon(this._inventorySlot, this);
      }
    }

    return this;
  }

  /** @internal */
  public _buildPackage(): mod.WeaponPackage {
    const weaponPackage = mod.CreateNewWeaponPackage();

    for (const attachment of this.attachments) {
      mod.AddAttachmentToWeaponPackage(attachment, weaponPackage);
    }

    return weaponPackage;
  }
}
