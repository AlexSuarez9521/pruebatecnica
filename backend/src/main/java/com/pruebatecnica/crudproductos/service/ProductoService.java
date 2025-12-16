package com.pruebatecnica.crudproductos.service;

import com.pruebatecnica.crudproductos.dto.CombinacionProductosDTO;
import com.pruebatecnica.crudproductos.dto.InventarioResumenDTO;
import com.pruebatecnica.crudproductos.model.Producto;
import com.pruebatecnica.crudproductos.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductoService {

    private final ProductoRepository productoRepository;

    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> obtenerPorId(Long id) {
        return productoRepository.findById(id);
    }

    public Producto crear(Producto producto) {
        return productoRepository.save(producto);
    }

    public Optional<Producto> actualizar(Long id, Producto productoActualizado) {
        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setNombre(productoActualizado.getNombre());
                    producto.setDescripcion(productoActualizado.getDescripcion());
                    producto.setPrecio(productoActualizado.getPrecio());
                    producto.setCantidadStock(productoActualizado.getCantidadStock());
                    return productoRepository.save(producto);
                });
    }

    public boolean eliminar(Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public InventarioResumenDTO obtenerResumenInventario() {
        BigDecimal valorTotal = productoRepository.calcularValorTotalInventario();
        Producto productoMayorValor = productoRepository.findProductoConMayorValorInventario()
                .orElse(null);

        return new InventarioResumenDTO(valorTotal, productoMayorValor);
    }

    public List<CombinacionProductosDTO> encontrarCombinaciones(BigDecimal valorMaximo) {
        List<Producto> productos = productoRepository.findAllByOrderByPrecioAsc();
        List<CombinacionProductosDTO> combinaciones = new ArrayList<>();

        int n = productos.size();
        if (n < 2) {
            return combinaciones;
        }

        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                BigDecimal suma = productos.get(i).getPrecio().add(productos.get(j).getPrecio());
                if (suma.compareTo(valorMaximo) <= 0) {
                    List<String> nombres = Arrays.asList(
                            productos.get(i).getNombre(),
                            productos.get(j).getNombre()
                    );
                    combinaciones.add(new CombinacionProductosDTO(nombres, suma));
                }
            }
        }

        for (int i = 0; i < n - 2; i++) {
            for (int j = i + 1; j < n - 1; j++) {
                for (int k = j + 1; k < n; k++) {
                    BigDecimal suma = productos.get(i).getPrecio()
                            .add(productos.get(j).getPrecio())
                            .add(productos.get(k).getPrecio());
                    if (suma.compareTo(valorMaximo) <= 0) {
                        List<String> nombres = Arrays.asList(
                                productos.get(i).getNombre(),
                                productos.get(j).getNombre(),
                                productos.get(k).getNombre()
                        );
                        combinaciones.add(new CombinacionProductosDTO(nombres, suma));
                    }
                }
            }
        }

        combinaciones.sort((a, b) -> b.getSumaPrecios().compareTo(a.getSumaPrecios()));

        return combinaciones.size() > 5 ? combinaciones.subList(0, 5) : combinaciones;
    }
}
