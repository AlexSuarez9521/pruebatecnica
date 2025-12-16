package com.pruebatecnica.crudproductos.repository;

import com.pruebatecnica.crudproductos.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    /**
     * Calcula el valor total del inventario
     */
    @Query("SELECT COALESCE(SUM(p.precio * p.cantidadStock), 0) FROM Producto p")
    BigDecimal calcularValorTotalInventario();

    /**
     * Encuentra el producto con mayor valor de inventario
     */
    @Query("SELECT p FROM Producto p ORDER BY (p.precio * p.cantidadStock) DESC LIMIT 1")
    Optional<Producto> findProductoConMayorValorInventario();

    /**
     * Obtiene productos ordenados por precio ascendente
     */
    List<Producto> findAllByOrderByPrecioAsc();

    /**
     * Busca productos por nombre (case insensitive)
     */
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
