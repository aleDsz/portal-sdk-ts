import { Player } from "./entities/player";

export class InputRestrictions {
  private player: Player;
  private restrictions = new Map<mod.RestrictedInputs, boolean>();

  constructor(player: Player) {
    this.player = player;
  }

  private setRestriction(input: mod.RestrictedInputs, value: boolean) {
    this.restrictions.set(input, value);
    mod.EnableInputRestriction(this.player.native, input, value);
  }

  private getRestriction(input: mod.RestrictedInputs): boolean {
    return this.restrictions.get(input) ?? false;
  }

  public set all(value: boolean) {
    mod.EnableAllInputRestrictions(this.player.native, value);
    Object.values(mod.RestrictedInputs).forEach(input => {
      if (typeof input === 'number') { // Enums have reverse mappings
        this.restrictions.set(input as mod.RestrictedInputs, value);
      }
    });
  }

  public get cameraPitch(): boolean { return this.getRestriction(mod.RestrictedInputs.CameraPitch); }
  public set cameraPitch(value: boolean) { this.setRestriction(mod.RestrictedInputs.CameraPitch, value); }

  public get cameraYaw(): boolean { return this.getRestriction(mod.RestrictedInputs.CameraYaw); }
  public set cameraYaw(value: boolean) { this.setRestriction(mod.RestrictedInputs.CameraYaw, value); }

  public get crouch(): boolean { return this.getRestriction(mod.RestrictedInputs.Crouch); }
  public set crouch(value: boolean) { this.setRestriction(mod.RestrictedInputs.Crouch, value); }

  public get cycleFire(): boolean { return this.getRestriction(mod.RestrictedInputs.CycleFire); }
  public set cycleFire(value: boolean) { this.setRestriction(mod.RestrictedInputs.CycleFire, value); }

  public get cyclePrimary(): boolean { return this.getRestriction(mod.RestrictedInputs.CyclePrimary); }
  public set cyclePrimary(value: boolean) { this.setRestriction(mod.RestrictedInputs.CyclePrimary, value); }

  public get fireWeapon(): boolean { return this.getRestriction(mod.RestrictedInputs.FireWeapon); }
  public set fireWeapon(value: boolean) { this.setRestriction(mod.RestrictedInputs.FireWeapon, value); }

  public get interact(): boolean { return this.getRestriction(mod.RestrictedInputs.Interact); }
  public set interact(value: boolean) { this.setRestriction(mod.RestrictedInputs.Interact, value); }

  public get jump(): boolean { return this.getRestriction(mod.RestrictedInputs.Jump); }
  public set jump(value: boolean) { this.setRestriction(mod.RestrictedInputs.Jump, value); }

  public get moveForwardBack(): boolean { return this.getRestriction(mod.RestrictedInputs.MoveForwardBack); }
  public set moveForwardBack(value: boolean) { this.setRestriction(mod.RestrictedInputs.MoveForwardBack, value); }

  public get moveLeftRight(): boolean { return this.getRestriction(mod.RestrictedInputs.MoveLeftRight); }
  public set moveLeftRight(value: boolean) { this.setRestriction(mod.RestrictedInputs.MoveLeftRight, value); }

  public get prone(): boolean { return this.getRestriction(mod.RestrictedInputs.Prone); }
  public set prone(value: boolean) { this.setRestriction(mod.RestrictedInputs.Prone, value); }

  public get reload(): boolean { return this.getRestriction(mod.RestrictedInputs.Reload); }
  public set reload(value: boolean) { this.setRestriction(mod.RestrictedInputs.Reload, value); }

  public get selectCharacterGadget(): boolean { return this.getRestriction(mod.RestrictedInputs.SelectCharacterGadget); }
  public set selectCharacterGadget(value: boolean) { this.setRestriction(mod.RestrictedInputs.SelectCharacterGadget, value); }

  public get selectMelee(): boolean { return this.getRestriction(mod.RestrictedInputs.SelectMelee); }
  public set selectMelee(value: boolean) { this.setRestriction(mod.RestrictedInputs.SelectMelee, value); }

  public get selectOpenGadget(): boolean { return this.getRestriction(mod.RestrictedInputs.SelectOpenGadget); }
  public set selectOpenGadget(value: boolean) { this.setRestriction(mod.RestrictedInputs.SelectOpenGadget, value); }

  public get selectPrimary(): boolean { return this.getRestriction(mod.RestrictedInputs.SelectPrimary); }
  public set selectPrimary(value: boolean) { this.setRestriction(mod.RestrictedInputs.SelectPrimary, value); }

  public get selectSecondary(): boolean { return this.getRestriction(mod.RestrictedInputs.SelectSecondary); }
  public set selectSecondary(value: boolean) { this.setRestriction(mod.RestrictedInputs.SelectSecondary, value); }

  public get selectThrowable(): boolean { return this.getRestriction(mod.RestrictedInputs.SelectThrowable); }
  public set selectThrowable(value: boolean) { this.setRestriction(mod.RestrictedInputs.SelectThrowable, value); }

  public get sprint(): boolean { return this.getRestriction(mod.RestrictedInputs.Sprint); }
  public set sprint(value: boolean) { this.setRestriction(mod.RestrictedInputs.Sprint, value); }

  public get zoom(): boolean { return this.getRestriction(mod.RestrictedInputs.Zoom); }
  public set zoom(value: boolean) { this.setRestriction(mod.RestrictedInputs.Zoom, value); }
}
