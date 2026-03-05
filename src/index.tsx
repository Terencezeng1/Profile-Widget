// ... (imports remain the same)

// Logic Fix: Update attributes to include 'items'
const widgetAttributes: string[] = ["fieldlabel", "items", "accentcolor"];

const factory: BlockFactory = (BaseBlockClass, _widgetApi) => {
  return class ProfileWidgetBlock extends BaseBlockClass implements BaseBlock {
    // ... constructor remains same

    private get props(): ProfileWidgetProps {
      // Logic Fix: items arrives as a JSON string from the Studio, so we parse it
      const attrs = this.parseAttributes<any>();
      return {
        ...attrs,
        items:
          typeof attrs.items === "string"
            ? JSON.parse(attrs.items)
            : attrs.items,
        contentLanguage: this.contentLanguage,
      };
    }

    public async renderBlock(container: HTMLElement): Promise<void> {
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
      this.renderBlock(this);
    }
  };
};

// ... (blockDefinition and window.defineBlock remain the same)
