package com.pruebatecnica.crudproductos.controller;

import com.pruebatecnica.crudproductos.dto.CombinacionProductosDTO;
import com.pruebatecnica.crudproductos.dto.InventarioResumenDTO;
import com.pruebatecnica.crudproductos.model.Producto;
import com.pruebatecnica.crudproductos.service.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductoController {

    private final ProductoService productoService;

    /**
     * GET /api/productos - Obtiene todos los productos
     */
    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodos() {
        List<Producto> productos = productoService.obtenerTodos();
        return ResponseEntity.ok(productos);
    }

    /**
     * GET /api/productos/{id} - Obtiene un producto por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return productoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/productos - Crea un nuevo producto
     */
    @PostMapping
    public ResponseEntity<Producto> crear(@Valid @RequestBody Producto producto) {
        Producto productoCreado = productoService.crear(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(productoCreado);
    }

    /**
     * PUT /api/productos/{id} - Actualiza un producto existente
     */
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Producto producto) {
        return productoService.actualizar(id, producto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE /api/productos/{id} - Elimina un producto
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (productoService.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * GET /api/productos/inventario/resumen - Obtiene el resumen del inventario
     * (valor total y producto con mayor valor)
     */
    @GetMapping("/inventario/resumen")
    public ResponseEntity<InventarioResumenDTO> obtenerResumenInventario() {
        InventarioResumenDTO resumen = productoService.obtenerResumenInventario();
        return ResponseEntity.ok(resumen);
    }

    /**
     * GET /api/productos/combinaciones/{valorMaximo} - Obtiene combinaciones de productos
     * cuya suma de precios sea <= valorMaximo
     */
    @GetMapping("/combinaciones/{valorMaximo}")
    public ResponseEntity<List<List<Object>>> obtenerCombinaciones(
            @PathVariable BigDecimal valorMaximo) {
        List<CombinacionProductosDTO> combinaciones = productoService.encontrarCombinaciones(valorMaximo);

        // Convertir al formato requerido: [[nombre1, nombre2, suma], ...]
        List<List<Object>> resultado = combinaciones.stream()
                .map(CombinacionProductosDTO::toListFormat)
                .toList();

        return ResponseEntity.ok(resultado);
    }
}
