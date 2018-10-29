/**
 * @param {HTMLElement} element
 * @param {?Function} [callback]
 */
class Resizer {
  constructor(element, callback = undefined) {
    /**
     * @type {Object|DOMRectReadOnly}
     * @private
     */
    this._rect = {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    };

    /**
     * Store the callback so we can call it when needed.
     * @type {?Function}
     * @private
     */
    this._callback = callback;
    this.__onResize = this._onResize.bind(this);

    this.observer = new ResizeObserver(this.__onResize);

    this.observer.observe(element);
  }

  /** @return {number} */
  get width() {
    return this._rect.width;
  }

  /** @return {number} */
  get height() {
    return this._rect.height;
  }

  /** @return {number} */
  get top() {
    return this._rect.top;
  }

  /** @return {number} */
  get left() {
    return this._rect.left;
  }

  /** @return {number} */
  get x() {
    return this._rect.x;
  }

  /** @return {number} */
  get y() {
    return this._rect.y;
  }

  /**
   * Change the callback.
   * @param {Function} callback
   */
  set onResize(callback) {
    this._callback = callback;
  }

  /**
   * @param {Array<ResizeObserverEntry>} entries
   * @private
   */
  _onResize(entries) {
    for (let entry of entries) {
      this._rect = entry.contentRect;
    }

    if (this._callback) {
      this._callback(this._rect);
    }
  }
}

export default Resizer;
