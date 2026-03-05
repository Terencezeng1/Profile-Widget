// ... keep imports same
const widgetAttributes: string[] = ["fieldlabel", "items", "accentcolor"];

const factory: BlockFactory = (BaseBlockClass, _widgetApi) => {
  return class ProfileWidgetBlock extends BaseBlockClass implements BaseBlock {
    private _root: ReactDOM.Root | null = null;

    private get props(): ProfileWidgetProps {
      const attrs = this.parseAttributes<any>();

      // LOGIC FIX: Parse the list of items from Staffbase
      let parsedItems = [];
      try {
        parsedItems =
          typeof attrs.items === "string"
            ? JSON.parse(attrs.items)
            : attrs.items || [];
      } catch (e) {
        parsedItems = [];
      }

      return {
        ...attrs,
        items: parsedItems,
        contentLanguage: this.contentLanguage,
      };
    }

    public async renderBlock(container: HTMLElement): Promise<void> {
      // Get real user data from the platform
      const user = await _widgetApi.getUserInformation();
      this._root ??= ReactDOM.createRoot(container);
      this._root.render(<ProfileWidget {...this.props} user={user} />);
    }

    public static get observedAttributes(): string[] {
      return widgetAttributes;
    }

    public attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string,
    ): void {
      super.attributeChangedCallback.apply(this, [name, oldValue, newValue]);
      this.renderBlock(this); // Force update in Studio
    }
  };
};
// ... rest of file same
