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

    @Query("SELECT COALESCE(SUM(p.precio * p.cantidadStock), 0) FROM Producto p")
    BigDecimal calcularValorTotalInventario();

    @Query("SELECT p FROM Producto p ORDER BY (p.precio * p.cantidadStock) DESC LIMIT 1")
    Optional<Producto> findProductoConMayorValorInventario();

    List<Producto> findAllByOrderByPrecioAsc();

    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
