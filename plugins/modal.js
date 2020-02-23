/*
* title: string +
* closable: boolean +
* content: string +
* width: string ('400px') +
* destroy(): void +
* Окно должно закрываться +
* --------------
* setContent(html: string): void | PUBLIC
* onClose(): void
* onOpen(): void
* beforeClose(): boolean
* --------------
* animate.css
* */
Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextElementSibling);
};

function noop() {}

$.modal = function(options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const listener = (e) => {
    if (e.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener('click', listener, false);

  const modal = {
    open() {
      if (!destroyed) {
        !closing && $modal.classList.add('open');
      }
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hiding');
      setTimeout(() => {
        $modal.classList.remove('hiding');
        closing = false;
      }, ANIMATION_SPEED)
    }
  };

  return Object.assign(modal, {
    destroy() {
      $modal.removeEventListener('click', listener, false);
      $modal.parentNode.removeChild($modal);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    }
  })
};

function _createModal(options) {
  const DEFAULT_WIDTH = '600px';
  const modal = document.createElement('div');
  modal.classList.add('vmodal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close='true'>
      <div class="modal-window" style="${options.width || DEFAULT_WIDTH}">
        <div class="modal-header">
          <span class="modal-title">${options.title || 'Окно'}</span>
          ${options.closable ? `<span class="modal-close" data-close='true'>&times;</span>` : ''}
        </div>
        <div class="modal-body" data-content>
          ${options.content || ''}
        </div>
      </div>
    </div>
  `);
  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector('[data-content]'));
  document.body.appendChild(modal);
  return modal;
}

function _createModalFooter(buttons = []) {
  const $footer = document.createElement('div');
  if (!(buttons.length === 0)) {
    $footer.classList.add('modal-footer');
    buttons.forEach(btn => {
      const $btn = document.createElement('button');
      $btn.textContent = btn.text;
      $btn.classList.add('btn', `btn-${btn.type || 'secondary'}`);
      $btn.onclick = btn.handler || noop;
      $footer.appendChild($btn);
    })
  }
  return $footer;
}