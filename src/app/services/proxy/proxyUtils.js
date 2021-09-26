export function createOrGetView(proxyManager, viewType, name) {
    const views = proxyManager.getViews();
    const view = views.find((v) => v.getName() === name);
    if (view) {
      return view;
    }
  
    return proxyManager.createProxy('Views', viewType, { name });
  }
  
  export function createFourUpViews(proxyManager) {
    createOrGetView(proxyManager, 'ViewX', 'Coronal');
    createOrGetView(proxyManager, 'ViewY', 'Sagittal');
    createOrGetView(proxyManager, 'ViewZ', 'Transverse');
    createOrGetView(proxyManager, 'View3D', 'Tridimensional');
  }
  