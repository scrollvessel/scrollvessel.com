export class SvgIcon {
  constructor(private readonly paths: string) {}

  render(): string {
    return `<svg class="external-link-svg" viewBox="0 0 24 24" role="img" focusable="false">${this.paths}</svg>`
  }
}
